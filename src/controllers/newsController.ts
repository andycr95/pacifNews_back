import { PrismaClient } from '@prisma/client'
import { NewNewEntry, News } from '../types'
const prisma = new PrismaClient()
let date: Date = new Date('MM-dd-yyyy');

export default class NewController {
    
    // Listar todas las novedades
    public static async getNews (): Promise<any> {
        const news = await prisma.new.findMany()
        return news
    }

    // Listar las ultimas novedades
    public static async getNewNews (): Promise<any> {
        const news = await prisma.new.findMany({take: 10, orderBy: { content: 'desc' }})
        return news
    }

    // Metodo para crear varias novedades
    public static async createNews (body: any): Promise<any> {
        const news = await prisma.new.createMany({
            data: body })
        return news
    }

    // Metodo para obtener una novedad
    public static async getNewById (id: number): Promise<any> {
        const newId = await prisma.new.findUnique({ where: { id } })
        if (newId == null) throw new Error('Usuario no encontrado')
        return newId
    }

    // Metodo para obtener las novedades populares
    public static async getPopularNews (): Promise<any> {
        const newsCount = await prisma.new.count();
        const skip = Math.floor(Math.random() * newsCount);
        const news = await prisma.new.findMany({take: 3, skip: skip, orderBy: { content: 'desc' }})
        return news
    }

    // Metodo para crear novedad
    public static async addNews (newDairyEntry: NewNewEntry): Promise<News | unknown> {
        console.log(newDairyEntry);
        
        const news = newDairyEntry
        const addedDairyEntry = await prisma.new.create({
          data: {
             title: news.title,
             description: news.description,
             content: news.content,
             urlToImage: news.urlToImage,
          }
        })
        
        return addedDairyEntry
    }

       // Actualizar un usuario
    public static async updateNew (id: number, newDairyEntry: NewNewEntry): Promise<News | unknown> {
        const newId = await prisma.new.findUnique({ where: { id } })
        if (newId == null) throw new Error('Novedad no encontrada')
        const updatedDairyEntry = await prisma.new.update({
        where: { id },
        data: {
            title: newDairyEntry.title,
            description: newDairyEntry.description,
            content: newDairyEntry.content,
            urlToImage: newDairyEntry.urlToImage,
            publishedAt: date
        }
        })
        return updatedDairyEntry
    }

   // Eliminar una novedad
   public static async deleteNew (id: number): Promise<any> {
    const newId = await prisma.new.findUnique({ where: { id } })
    if (newId == null) throw new Error('Usuario no encontrado')
    const deletedDairyEntry = await prisma.new.delete({ where: { id } })
    return deletedDairyEntry
   }

}