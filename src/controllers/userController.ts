import { LoginUserEntry } from '../types'
import jwt from '../utils/jwt'
import Axios from "axios";
const oracledb = require('oracledb');


export default class UserController {

  public static async validate (user: LoginUserEntry): Promise<any> {
    const { email, password } = user;
    const resp = await Axios.post(`http://api.unipacifico.edu.co/apiunipacifico/public/api/auth/userLogin?usuario=${email}&pass=${password}`, { responseType: 'json' });
    if (resp.data.msj != undefined || resp.data.msj != null) return { error: resp.data, hasError: true };
    const token = await jwt.signAccessToken({ id: resp.data.id });
    return { user: resp.data, token }
  }

  public static async getUser (id: String): Promise<any> {
    let connection;
    connection = await oracledb.getConnection({ user: "reporteador", password: "reporteador", connectionString: "181.224.160.30/UNIPA1N" });
    const sql = `select * from ACADEMICO.V_ESTUDIANTES ve JOIN ACADEMICO.PROGRAMA p ON p.PROG_ID = ve.IDPROGRAMA WHERE ve.IDPEGE = ${id}`;
    let result = await connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    if (result.rows.length == 0) {
      const sql2 = `select * from ACADEMICO.V_FUNCIONARIOS WHERE IDPEGE = ${id}`;
      let result = await connection.execute(sql2, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
      const rs = result.rows;
      rs[0].USUARIOTIPO = "FUNCIONARIO";
      return rs[0];
    }
    
    const rs = result.rows;
    rs[0].USUARIOTIPO = "ESTUDIANTE";
    return rs[0];
    
  }
  // Listar todos los usuarios
  /*public static async getUser (): Promise<any> {
    const users = await prisma.user.findMany()
    return users
  }

  // Metodo para obtener un usuario
  public static async getUserById (id: number): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user == null) throw new Error('Usuario no encontrado')
    return user
  }

  // Agregar un usuario
  public static async addUser (newDairyEntry: NewUserEntry): Promise<User | unknown> {
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
  }

  // Actualizar un usuario
  public static async updateUser (id: number, newDairyEntry: NewUserEntry): Promise<User | unknown> {
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
  }

  // Eliminar un usuario
  public static async deleteUser (id: number): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user == null) throw new Error('Usuario no encontrado')
    const deletedDairyEntry = await prisma.user.delete({ where: { id } })
    return deletedDairyEntry
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
    if (!token) throw new Error('Usuario no autenticado');
    try {
      const payload = await jwt.verifyAccessToken(token)
      return { user: payload, token, hasError: false }
    } catch (error) {
      throw new Error('Usuario no autenticado');
    }
  }*/
}
