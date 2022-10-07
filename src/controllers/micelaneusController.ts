import { PrismaClient } from '@prisma/client'
/*import { NewTvGrillEntry } from '../types'
import notificationController from './firebaseController'*/
const prisma = new PrismaClient()

export default class MicelaneusController {

    // Listar eventos de la base de datos, con paginacion
    static async getEvents(page: number, limit: number) {
        const total = await prisma.hechos_destacados.count();
        const events = await prisma.hechos_destacados.findMany({
            skip: page < 1 ? 0 : (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc'
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
        const event = await prisma.hechos_destacados.findUnique({
            where: {
                id: id
            }
        })
        return event;
    }

    // Listar eventos destacados, maximo 20
    static async getEventsDestacados() {
        const events = await prisma.hechos_destacados.findMany({
            take: 4,
            orderBy: {
                id: 'desc'
            }
        })
        return events
    }

    // Lista videos institucionales
    static async getVideos(page: number, limit: number) {
        const total = await prisma.videos_institucionales.count();
        const videosI = await prisma.videos_institucionales.findMany({
            skip: page < 1 ? 0 : (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc'
            }
        })
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
    static async getBannersDestacados() {
        const banners = await prisma.banners.findMany({
            where: {
                estado: '1'
            },
            take: 4,
            orderBy: {
                id: 'desc'
            }
        })
        return banners
    }

    // Listar todos los banners
    static async getBanners() {
        const banners = await prisma.banners.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return banners
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