import {PrismaClient} from '@prisma/client'
import { banners } from '../types';
import { IvsClient, 
    BatchGetChannelCommand, 
    CreateChannelCommand, 
    CreateChannelCommandInput, 
    BatchGetChannelCommandInput,
    GetStreamCommandInput,
    GetStreamCommand, 
    } from "@aws-sdk/client-ivs";
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "../utils/config";
import firebaseController from './firebaseController';
const client = new IvsClient({ 
    region: AWS_REGION, 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    },
});

const prisma = new PrismaClient()
export default class MicelaneusController {

    // Listar eventos de la base de datos, con paginacion entre la fecha inicio y fecha fin
    static async getEvents(page: number, limit: number) {
        const Newdate = new Date();
        let day = ("0" + Newdate.getDate()).slice(-2);
        let month = ("0" + (Newdate.getMonth() + 1)).slice(-2);
        const date = `${Newdate.getFullYear()}-${month}-${day}`
        const total = await prisma.hechos_destacados.count({
            where: {
                fecha_inicio: {
                    lte: date
                },
                AND: {
                    fecha_final: {
                        gte: date
                    }
                }
            }
        });
        const events = await prisma.hechos_destacados.findMany({
            skip: page < 1 ? 0 : (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            where: {
                fecha_inicio: {
                    lte: date
                },
                AND: {
                    fecha_final: {
                        gte: date
                    }
                }
            }
        })
        const data = {
            page: page,
            totalPages: Math.ceil(total / limit),
            totalPerPage: events.length,
            total: total,
            data: events
        }
        return data;
    }
    
    // obtener evento destacado por id
    static async getEventById(id: number) {
        const event = await prisma.hechos_destacados.findUnique({ where: { id } })
        if (event == null) throw new Error('Eventos no encontrado')
        return event
    }

    // Listar eventos destacados, maximo 20
    static async getEventsDestacados() {
        const Newdate = new Date();
        let day = ("0" + Newdate.getDate()).slice(-2);
        let month = ("0" + (Newdate.getMonth() + 1)).slice(-2);
        const date = `${Newdate.getFullYear()}-${month}-${day}`
        const events = await prisma.hechos_destacados.findMany({
            take: 4,
            orderBy: {
                id: 'desc'
            },
            where: {
                fecha_inicio: {
                    lte: date
                },
                AND: {
                    fecha_final: {
                        gte: date
                    }
                }
            }
        })
        return events
    }

    // Lista videos institucionales
    static async getVideos(page: number, limit: number) {
        const total = await prisma.videos_institucionales.count({
            where: {
                estado: '1'
            }
        });
        const videosI: any = await prisma.$queryRaw`SELECT titulo, imagen, tipo, enlace, estado, to_char(created_at,'YYYY-MM-DD') as created_at FROM videos_institucionales WHERE estado = '1' LIMIT ${limit} OFFSET ${page < 1 ? 0 : (page - 1) * limit}`;
        
        const data = {
            page: page,
            totalPages: Math.ceil(total / limit),
            totalPerPage: videosI.length,
            total: total,
            data: videosI
        }
        return data;
    }
    

    // Obtener video intitucional por id
    static async getVideoIById(id: number) {
        const event = await prisma.videos_institucionales.findUnique({
            where: {
                id: id
            }
        })
        return event;
    }

    // Lista documentos de convocatorias, tipo = tipodoc
    static async getConvocatorias(page: number, limit: number) {
        const total = await prisma.documentos.count({
            where: {
                tipo: 'CON'
            }
        });
        const convocatorias = await prisma.documentos.findMany({
            where: {
                tipo: 'CON'
            },
            skip: page < 1 ? 0 : (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc'
            }
        })
        const data = {
            page: page,
            totalPages: Math.ceil(total / limit),
            totalPerPage: convocatorias.length,
            total: total,
            data: convocatorias
        }
        return data;
    }

    // Obtener convocatoria por id
    static async getConvocatoriaById(id: number) {
        const convocatoria = await prisma.documentos.findUnique({
            where: {
                id: id
            }
        })
        return convocatoria;
    }

    // Listar banners destacados
    static async getBannersDestacados(): Promise<banners[]> {
        const banners = await prisma.banners.findMany({
            where: {
                estado: '1'
            },
            take: 4,
            orderBy: {
                id: 'desc'
            }
        }).then((data: any[]) => {
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                e.enlace_boton?.length == 0 ? e.tipo = null : e.enlace_boton?.includes('pdf') ? e.tipo = 'pdf' : e.tipo = 'url'
            }

            return data;
        })
        return banners
    }

    // Listar todos los banners
    static async getBanners(): Promise<banners[]> {
        const banners = await prisma.banners.findMany({
            orderBy: {
                id: 'desc'
            }
        }).then((data: any[]) => {
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                e.enlace_boton?.length == 0 ? e.tipo = null : e.enlace_boton?.includes('pdf') ? e.tipo = 'pdf' : e.tipo = 'url'
            }

            return data;
        })
        return banners
    }

    // Listar los canales de ivs
    static async getChannels() {
        const channels = await firebaseController.getChannels();
        const channelsA = await firebaseController.getChannelsAll();
        if (channels.length == 0) return channels;
        const params: BatchGetChannelCommandInput = {
            arns: channels
        };
        const channelsAWS = await client.send(new BatchGetChannelCommand(params));
        const data = [];
        for (let i = 0; i < channelsAWS.channels!.length; i++) {
            const e = channelsAWS.channels![i];
            for (let j = 0; j < channelsA.length; j++) {
                const c = channelsA[j];
                if (e.arn == c.id) {
                    data.push(c);
                }
            }
        }
        return data;
    }

    // obtener un canal de ivs
    static async getChannelById(arn: string) {
        const fire = await firebaseController.getChannelById(arn);
        try {
            const data = await client.send(new GetStreamCommand({channelArn: arn}))
            return {
                ...data,
                ...fire,
                isActive: true
            }
        } catch (err) {
            return {
                ...fire,
                isActive: false
            }   
        }
    }

    // Crear canal de ivs
    static async addChannel(params: CreateChannelCommandInput, firebaseParams: any) {
        const data = await client.send(new CreateChannelCommand(params));
        await firebaseController.registerChannel({...data, id: data?.channel?.arn, ...firebaseParams});
        return data;
    }

    // listar los streams de un canal de ivs
    static async getStreamsByChannel(arn: string) {
        const params: GetStreamCommandInput = {
            channelArn: arn
        };
        const data = await client.send(new GetStreamCommand(params));
        return data;
    }

    // listar los calendarios de cada año academico
    static async getCalendars() {
        const Newdate = new Date();
        const calendars = await prisma.calendarioacade.findMany({
            where: {
                fechaini: {
                    lte: Newdate
                },
                AND: {
                    fechafin: {
                        gte: Newdate
                    }
                }
            }
        })
        return calendars;
    }

    // Obtener calendarios por id
    static async getCalendarsById(id: number) {
        const calendar = await prisma.detallecalendarioacade.findMany({
            where: {
                idcalendarioacade : id
            }
        })
        return calendar;
    }
        

    // Listar todas la parrillas de tv
    /*public static async getTvGrills (): Promise<any> {
        const tvGrids = await prisma.grill.findMany({orderBy: { id: 'desc' }})
        return tvGrids
    }

    // Metodo para obtener una parilla de tv
    public static async getTvGrillById (id: number): Promise<any> {
        const grill = await prisma.grill.findUnique({ where: { id } })
        if (grill == null) throw new Error('Usuario no encontrado')
        return grill
    }
    //Metodo para crear un comunicado
    public static async createTvGrill (body: NewTvGrillEntry): Promise<any> {
        const grill = await prisma.grill.create({ data: body })
        const message = {
            notification: {
                title: 'Nueva parrilla de tv',
                body: grill.title,
                imageUrl: null,
                fileUrl: grill.urlToFile,
                data: grill.id.toString()
            },
            topic: 'grills'
        }
        notificationController.emitNotification(message);
        return grill
    }

    //Metodo para actualizar una parrilla de tv
    public static async updateTvGrill (id: number, body: NewTvGrillEntry): Promise<any> {
        const grill = await prisma.grill.update({ where: { id }, data: body })
        return grill
    }
    */

}