import { NewDairyEntry } from './types'
import { Visibility, Weather } from './enums'

const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    console.log(!isString(commentFromRequest))
    throw new Error('Invalid comment')
  }

  return commentFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Invalid date')
  }

  return dateFromRequest
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Invalid or missing weather')
  }

  return weatherFromRequest
}

const isWeather = (param: any): boolean => {
  return Object.values(Weather).includes(param)
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
    throw new Error('Invalid or missing visibility')
  }

  return visibilityFromRequest
}

const isVisibility = (param: any): boolean => {
  return Object.values(Visibility).includes(param)
}

const toNewDairyEntry = (entry: any): NewDairyEntry => {
  const newEntry: NewDairyEntry = {
    comment: parseComment(entry.comment),
    date: parseDate(entry.date),
    weather: parseWeather(entry.weather),
    visibility: parseVisibility(entry.visibility)
  }

  return newEntry
}

export default toNewDairyEntry
