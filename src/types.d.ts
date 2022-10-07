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

export interface NoticiasActualidads {
  id: number
  user_id: number?,
  departamento_id: number?,
  categoria: string?,
  titulo: string?,
  titulo_ingles: string?,
  imagen_miniatura: string?,
  imagen_principal: string?,
  descripcion_corta: string?,
  descripcion_corta_ingles: string?,
  contenido: string?,
  contenido_ingles: string?,
  contador_visita: number?,
  tags: string?,
  prioridad: string?,
  estado: string?,
  created_at: DateTime?,
  updated_at: DateTime?,
  fecha_noticia: DateTime
}

export interface Article {
  id: number
  title: string
  description: string
  content: string
  urlToImage: string
  publishedAt: string?
}

export interface TvGrill {
  id: number
  title: string
  urlToFile: string
  publishedAt: string?
}

export interface Message {
    notification: {
      title: string
      body: any | null
      data: any | null
      imageUrl: string | null
      fileUrl: string | null
    },
    topic: string
}

export type NewUserEntry = Omit<User, 'id'>
export type NewNewEntry = Omit<News, 'id'>
export type NewArticleEntry = Omit<Article, 'id' | 'publishedAt'>
export type NewTvGrillEntry = Omit<TvGrill, 'id' | 'publishedAt'>
export type LoginUserEntry = Omit<User, 'id' | 'name' | 'phoneNumber'>
