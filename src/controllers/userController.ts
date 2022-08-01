import { PrismaClient } from '@prisma/client'
import { NewUserEntry, User } from '../types'
import jwt from '../utils/jwt'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

export default class UserController {
  // Listar todos los usuarios
  public static async getUser (): Promise<any> {
    try {
      const users = await prisma.user.findMany()
      return users
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // Metodo para obtener un usuario
  public static async getUserById (id: number): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user == null) throw new Error('Usuario no encontrado')
    return user
  }

  // Agregar un usuario
  public static async addUser (newDairyEntry: NewUserEntry): Promise<User | unknown> {
    try {
      const email = await prisma.user.findMany({ where: { email: newDairyEntry.email } })
      if (email.length > 0) return { error: 'Este correo electronico se encuentra en uso', hasError: true }
      const user = newDairyEntry
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
      const addedDairyEntry = await prisma.user.create({
        data: {
          name: user.name,
          password: user.password,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      })
      return addedDairyEntry
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // Actualizar un usuario
  public static async updateUser (id: number, newDairyEntry: NewUserEntry): Promise<User | unknown> {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user == null) throw new Error('Usuario no encontrado')
      const updatedDairyEntry = await prisma.user.update({
        where: { id },
        data: {
          name: newDairyEntry.name,
          password: newDairyEntry.password,
          email: newDairyEntry.email,
          phoneNumber: newDairyEntry.phoneNumber
        }
      })
      return updatedDairyEntry
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // Eliminar un usuario
  public static async deleteUser (id: number): Promise<any> {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user == null) throw new Error('Usuario no encontrado')
      const deletedDairyEntry = await prisma.user.delete({ where: { id } })
      return deletedDairyEntry
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // Inicio de sesion
  public static async login (email: string, password: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user == null) throw new Error('Usuario no encontrado')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Contraseña incorrecta')
    const token = await jwt.signAccessToken({ id: user.id })
    return { user, token }
  }

  // Verificar si un usuario esta logueado
  public static async isLoggedIn (token: string | undefined): Promise<any> {
    if (!token) return { error: 'No token provided', hasError: true }
    try {
      const payload = await jwt.verifyAccessToken(token)
      return { user: payload, token, hasError: false }
    } catch (error) {
      return { error: 'Unauthorized', hasError: true }
    }
  }
}
