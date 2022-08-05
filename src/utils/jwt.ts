import jwt, { Secret } from 'jsonwebtoken'
import createError from 'http-errors'
import dotenv from 'dotenv'
dotenv.config()

const accessTokenSecret = 'unipacifico' as Secret

const jswt = {

  async signAccessToken (payload: any) {
    return await new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {
      }, (err: any, token: any) => {
        console.log(accessTokenSecret);
        console.log(err);
        
        
        if (err) {
          reject(new createError.InternalServerError())
        } else {
          resolve(token)
        }
      })
    })
  },

  async verifyAccessToken (token: string) {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
        if (err) {
          reject(new createError.InternalServerError())
        } else {
          resolve(payload)
        }
      })
    })
  }
}

export default jswt
