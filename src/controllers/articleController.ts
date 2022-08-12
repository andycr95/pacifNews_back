import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class ArticleController {
    // Listar todos los comunicados
    public static async getArticles (): Promise<any> {
        const articles = await prisma.article.findMany()
        return articles
    }

    // Listar los ultimos comunicados
    public static async getNewsArticles (): Promise<any> {
        const articles = await prisma.article.findMany({take: 10, orderBy: { content: 'desc' }})
        return articles
    }

    // Metodo para obtener un comunicado
    public static async getArticleById (id: number): Promise<any> {
        const article = await prisma.article.findUnique({ where: { id } })
        if (article == null) throw new Error('Usuario no encontrado')
        return article
    }

    // Metodo para obtener los comunicados populares
    public static async getPopularArticles (): Promise<any> {
        const articlesCount = await prisma.article.count();
        const skip = Math.floor(Math.random() * articlesCount);
        const articles = await prisma.article.findMany({take: 3, skip: skip, orderBy: { content: 'desc' }})
        return articles
    }

    // Metodo para crear varios comunicados
    public static async createArticles (body: any): Promise<any> {
        const articles = await prisma.article.createMany({
            data: body
        })
        return articles
    }

}