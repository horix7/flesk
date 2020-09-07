import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import databaseConnect from './connect'
import {returnError, conflictError} from '../helpers/errorturns'
import {resolveAwait } from '../helpers/promisesFix'
import {v4 as uuidv4}  from 'uuid'
import bcrypt from 'bcrypt'

databaseConnect
dotenv.config();

const userSchema = new mongoose.Schema({
  name:  String,
  user_id: {type: String, default: uuidv4() },
  password: String,
  username: String,
  email:   String,
  registered: { type: Date, default: Date.now },
  type: String,
  profile: {
    imageAddress: String,
    info: Object
  }
})

const User: any = mongoose.model(process.env.USERDB, userSchema);  


class UserModel {
   
    checkUserPresence = async (username: string, email: string) => {
      const trialOne = (): Promise<any> =>  User.findOne({username: username})
      const trialTwo = (): Promise<any> =>  User.findOne({email: email})
      let result = await trialOne()  ? { present: true, info: "username"} : await trialTwo() ? {present: true, info: "email Address"} : {present: false , info: null}   

      return result
      }
    
    
    registeredUser = async (userId: string) =>  {
      const userInfo = ():Promise<any> => User.findOne({user_id: userId}).select("name username email registered type user_id")
      const registeredUserInfo = await resolveAwait(userInfo)
      console.log(registeredUserInfo)
      if (registeredUserInfo !== null ) return registeredUserInfo 
      else return returnError("user does not exist", "invalid user ID")
    }

    allUsers = ():Promise<any> => User.find((err : any, allusers : object) =>  err ?  returnError(err, "get All user")  :  allusers ).select("name username email user_id registered profile")
  
    passwordHash = async (userData: any) => {
     const salt = await  bcrypt.genSaltSync(Number(process.env.SALTROUNDS))
     const hashedPassword = async ():Promise<any> => await bcrypt.hashSync(userData.password, salt)
     return await resolveAwait(hashedPassword)
    }

    userSinUp = async (userData : any): Promise<any>  => {
      const hashedPassWord = await this.passwordHash(userData)
      const present: any = await this.checkUserPresence(userData.username, userData.email)
      // User.watch().on('change', (data: any) => console.log(new Date(), data));
      let uniqueId = uuidv4({...userData})
      userData["user_id"] = uniqueId
      userData["password"] = hashedPassWord

      
      if(present.present) return conflictError( "already registered", "Your"  + " " + present.info + " " + "is already reistered in the sytem")
      
      let insertData: any = new User(userData)
      
      await  insertData.save((err: any, userInfo: any)=> {
       if(!err) return returnError(err, "signup") 
        return this.registeredUser(userInfo.user_id)
     })

     return {registeredId: insertData.user_id}
     
    }

    retrieveUserByUserName = async(username: string): Promise<any> => {
      const userInfo = ():Promise<any> => User.findOne({username: username})
      const userData = resolveAwait(userInfo)

      return userData
    }

    userSignIn = async(userData: any): Promise<any> => {
      const present: any = await this.checkUserPresence(userData.username, userData.username)
      
      if(!present.present) return conflictError( "Not Registered ", "You" + " " + present.info +  " " + "not registered in the system")
      const loginData =  await this.retrieveUserByUserName(userData.username)
      
      let login = await bcrypt.compareSync(userData.password, loginData.password)
      
      if(login) return loginData
      return returnError("password not matching"  , " password ")

    }

    

  
    
  
}


export default new UserModel

