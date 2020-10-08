import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import databaseConnect from './connect'
import {returnError, conflictError} from '../helpers/errorturns'
import {resolveAwait } from '../helpers/promisesFix'
import {v4 as uuidv4}  from 'uuid'

databaseConnect
dotenv.config();

const accountShcemma = new mongoose.Schema({
  account_id: {type: String, default: uuidv4()},
  owner:  String,
  name: String,
  type: String,
  profile:String,
  members: []

})

const Account: any = mongoose.model(process.env.ACCDB, accountShcemma);  


class AccountModel {
   
    checkAccounnExistance = async (name: string) => {
      const trialOne = (): Promise<any> =>  Account.findOne({name: name})
      
      let result = await trialOne()  ? { present: true, info: "name"} : {present: false , info: null}   

      return result
      }
    

    
    registeredAccount = async (accounId: string) =>  {
      const accountInfo = ():Promise<any> => Account.findOne({account_id: accounId}).select("name owner type ")
      const account_info = await resolveAwait(accountInfo)

      if (account_info !== null ) return account_info 
      else return returnError("Account does not exist", "invalid Account ID")
    }

    allAccount = ():Promise<any> => Account.find((err : any, allAccount : object) =>  err ?  returnError(err, "get All user")  :  allAccount ).select("name owner type ")

   
    getAccountByName = async(name: string): Promise<any> => {
      const account_info = ():Promise<any> => Account.find({name: name})
      const accountdata = resolveAwait(account_info)

      return accountdata
    }
    

    getAccountbyId  = async(id: string): Promise<any> => {
      
        const account_info = ():Promise<any> => Account.findOne({account_id: id})
        const accountdata = resolveAwait(account_info)
  
        return accountdata
    }
      
    
  
}


export default new AccountModel

