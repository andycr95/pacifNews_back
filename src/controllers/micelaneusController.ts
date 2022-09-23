import { PrismaClient } from '@prisma/client'
import { NewTvGrillEntry } from '../types'
import notificationController from './firebaseController'
const prisma = new PrismaClient()

export default class MicelaneusController {
    // Listar todas la parrillas de tv
    public static async getTvGrills (): Promise<any> {
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
    

}