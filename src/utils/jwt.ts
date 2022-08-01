import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const createError = require('http-errors');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const jswt = {
    signAccessToken(payload: any){
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {
            }, (err: any, token: string) => {
                if (err) {
                reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, async (err: { name: string; message: any }, payload: any) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
                const user = await prisma.user.findFirst({ where: { id: payload.id } })
                resolve(user)
            })
        })
    }
}

export default jswt