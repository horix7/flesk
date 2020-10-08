import userModels from '../models/user.model'
import accountModel from  '../models/accounts.model'
import {Response, Request} from 'express'
import {checkErrorExistsance} from '../helpers/errorturns'
import authenticator from  '../middleware/authenticate'

class UserController {
  
    getAllUsers = async(request : Request, response : Response) =>  {
       
        const results = await userModels.allUsers()
        return response.status(200).json({results})
       
    }

    getAllAccount = async(request : Request, response : Response) =>  {
       
        const results = await accountModel.allAccount()
        return response.status(200).json({results})
       
    }

    createAccount = async( request: Request, response: Response) => {
        const results = await userModels.userSinUp(request.body)

        
        if(checkErrorExistsance(results).error && checkErrorExistsance(results).conflict) return response.status(409).json({...results})
        else if(checkErrorExistsance(results).error && !checkErrorExistsance(results).conflict) return response.status(400).json({...results})   
        else  {
            const registeredUserInfo: any = await userModels.registeredUser(results.registeredId)
            
            return response.status(201).json({
                status: "success",
                accesToken: authenticator.userAuth({...registeredUserInfo._doc}),
                accountDetails: {...registeredUserInfo._doc}
            })
        }  
    }

    userRegistriration = async( request: Request, response: Response) => {

        const results = await userModels.userSinUp(request.body)

        
        if(checkErrorExistsance(results).error && checkErrorExistsance(results).conflict) return response.status(409).json({...results})
        else if(checkErrorExistsance(results).error && !checkErrorExistsance(results).conflict) return response.status(400).json({...results})   
        else  {
            const registeredUserInfo: any = await userModels.registeredUser(results.registeredId)
            
            return response.status(201).json({
                status: "success",
                accesToken: authenticator.userAuth({...registeredUserInfo._doc}),
                user_details: {...registeredUserInfo._doc}
            })
        }
    } 
    
    userSignin = async (request: Request, response: Response) => {
        
        const results: any= await userModels.userSignIn(request.body)
        
        if(checkErrorExistsance(results).error) return response.status(400).json({...results})   
        return response.status(200).json({
            status: "success",
            accessToken: authenticator.userAuth({...results._doc}),
            user_details: {...results._doc}
        })

    }

    oneUser = async (request: Request, response: Response) => {
        
        const results: any = await userModels.registeredUser(request.params.user_id)
                
        if(checkErrorExistsance(results).error) return response.status(400).json({...results})   
        return response.status(200).json({...results._doc})
    }
}

export default new UserController