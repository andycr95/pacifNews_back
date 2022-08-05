import { LoginUserEntry, NewUserEntry } from '../types'

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest) || !isMajor(nameFromRequest, 3)) {
    throw new Error('Campo nombre invalido o vacio')
  }

  return nameFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest) || !isMajor(passwordFromRequest, 8)) {
    throw new Error('Campo contraseña invalido o vacio')
  }

  return passwordFromRequest
}

const isMajor = (data: string, length: number): boolean => {
  return Boolean(data.length > length)
}

const isEmail = (email: string): boolean => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return emailFormat.test(email)
}

const parseEmail = (emailFromRequest: any): string => {
  if (!isString(emailFromRequest) || !isEmail(emailFromRequest)) {
    throw new Error('Campo correo invalido o vacio')
  }

  return emailFromRequest
}

const parsePhoneNumber = (phoneNumberFromRequest: any): string => {
  if (!isString(phoneNumberFromRequest)) {
    throw new Error('Campo telefono invalido')
  }

  return phoneNumberFromRequest
}

const toNewUserEntry = (entry: any): NewUserEntry => {
  const newEntry: NewUserEntry = {
    name: parseName(entry.name),
    password: parsePassword(entry.password),
    email: parseEmail(entry.email),
    phoneNumber: parsePhoneNumber(entry.phoneNumber)
  }
  return newEntry
}

export const toLoginUserEntry = (entry: any): LoginUserEntry => {
  const loginEntry: LoginUserEntry = {
    email: parseEmail(entry.email),
    password: parsePassword(entry.password)
  }
  return loginEntry
}

export default toNewUserEntry
