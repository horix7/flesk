import jwt from 'jsonwebtoken'
import * as dotenv from  'dotenv'
import {resolveAwait} from '../helpers/promisesFix'
dotenv.config()


class Authethicate {

    userAuth =  (userinfo: object) => {
    return  jwt.sign(userinfo, process.env.AUTHKEY)

    }
}



export default new Authethicate