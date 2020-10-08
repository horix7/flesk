import jwt from 'jsonwebtoken'
import * as dotenv from  'dotenv'
import {resolveAwait} from '../helpers/promisesFix'
import {Request, Response, NextFunction} from 'express'

dotenv.config()


class Authethicate {

    userAuth =  (userinfo: object) => {
    return  jwt.sign(userinfo, process.env.AUTHKEY)

    }

    checkToken = (request: Request, response: Response, next: NextFunction) => {
        
        const verify = jwt.verify(request.body, process.env.AUTHKEY)
    }


}



export default new Authethicate