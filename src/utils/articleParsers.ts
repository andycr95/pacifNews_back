import { NewArticleEntry } from '../types'

const isString = (string: string): boolean => {
    return typeof string === 'string'
}

const isMajor = (data: string, length: number): boolean => {
    return Boolean(data.length > length)
}

const parseTitle = (titleFromRequest: any): string => {
  if (!isString(titleFromRequest) || !isMajor(titleFromRequest, 3)) {
    throw new Error('Campo titulo invalido o vacio')
  }

  return titleFromRequest
}


const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest) || !isMajor(descriptionFromRequest, 6)) {
    throw new Error('Campo descripcion invalido o vacio')
  }

  return descriptionFromRequest
}

const parseContent = (contentFromRequest: any): string => {
    if (!isString(contentFromRequest) || !isMajor(contentFromRequest, 6)) {
      throw new Error('Campo contenido invalido o vacio')
    }
  
    return contentFromRequest
}



 const toNewArticleEntry = (entry: any): NewArticleEntry => {
  const newEntry: NewArticleEntry = {
    title: parseTitle(entry.title),
    description: parseDescription(entry.description),
    content: parseContent(entry.content),
    urlToImage: entry.urlToImage,
  }
  return newEntry
}

export default toNewArticleEntry
