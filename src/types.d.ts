export interface User {
  id: number
  name: string
  email: string
  password: string
  phoneNumber: string
}

export interface IEnv {
  port: number
  db: {
    name: string
    user: string
    pw: string
    account: string
  }
  apiPath: string
  staticPath: string
}

export interface News {
  id: number
  title: string
  description: string
  content: string
  urlToImage: string,
  publishedAt: string
}

export interface Article {
  id: number
  title: string
  description: string
  content: string
  urlToImage: string,
  publishedAt: string?
}

export interface Message {
    notification: {
        title: string
        body: any
        imageUrl: any
    },
    topic: string
}

export type NewUserEntry = Omit<User, 'id'>
export type NewNewEntry = Omit<News, 'id'>
export type NewArticleEntry = Omit<Article, 'id' | 'publishedAt'>
export type LoginUserEntry = Omit<User, 'id' | 'name' | 'phoneNumber'>
