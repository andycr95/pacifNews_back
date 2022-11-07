import Prisma from '@prisma/client';
import { NoticiasActualidads } from '../types'
const prisma = new Prisma.PrismaClient()

export default class NewController {
    
    // Listar todas las novedades
    public static async getNews (page: number, limit: number): Promise<any> {
        const total = await prisma.noticias_actualidads.count({
            where: {
                estado: '1'
            }
        });
        const news = await prisma.noticias_actualidads.findMany({
            skip: page < 1 ? 0 : (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            where: {
                estado: '1'
            }
        })
        const data = {
            page: page,
            totalPages: Math.ceil(total / limit),
            totalPerPage: news.length,
            total: total,
            data: news
        }

        return data;
    }

    // Listar las ultimas novedades
    public static async getNewNews (): Promise<NoticiasActualidads[]> {
        const news = await prisma.noticias_actualidads.findMany({take: 4, orderBy: { id: 'desc' }, where: {
            estado: '1'
        }})
        return news
    }

    // Metodo para crear varias novedades
    /*public static async createNews (body: any): Promise<any> {
        const news = await prisma.new.createMany({
            data: body })
        return news
    }*/

    // Metodo para obtener una novedad
    public static async getNewById (id: number): Promise<NoticiasActualidads> {
        const newId = await prisma.noticias_actualidads.findUnique({ where: { id } })
        if (newId == null) throw new Error('Noticia no encontrada')
        return newId
    }

    // Metodo para obtener las novedades populares
    public static async getPopularNews (): Promise<NoticiasActualidads[]> {
        const newsCount = await prisma.noticias_actualidads.count();
        const skip = Math.floor(Math.random() * newsCount);
        const news = await prisma.noticias_actualidads.findMany({take: 4, skip: skip, orderBy: { id: 'desc' }})
        return news
    }

    // Metodo para crear novedad
    /*public static async addNews (newDairyEntry: NewNewEntry): Promise<News | unknown> {
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
    }*/

       // Actualizar un usuario
    /*public static async updateNew (id: number, newDairyEntry: NewNewEntry): Promise<News | unknown> {
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
    }*/

   // Eliminar una novedad
   /*public static async deleteNew (id: number): Promise<any> {
    const newId = await prisma.new.findUnique({ where: { id } })
    if (newId == null) throw new Error('Usuario no encontrado')
    const deletedDairyEntry = await prisma.new.delete({ where: { id } })
    return deletedDairyEntry
   }*/

}