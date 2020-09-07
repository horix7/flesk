import Joi from 'joi'
import {Request, Response, NextFunction} from "express"
import { errorExist } from '../helpers/errorturns'

class Validation {
    
    userschema= Joi.object({
        name: Joi.string().required().trim(),
        username: Joi.string().alphanum().min(4).max(20).required().trim(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required().trim(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', "io", "org", "dev"] } }).required(),
        gender:  Joi.string().required(),
        profile: Joi.object(),
        type: Joi.string()
   
    })


    userSignUpVerification = (request: Request, response :Response, next: NextFunction) => {
       
        const validations:any = this.userschema.validate(request.body)
        if(errorExist(validations)) return response.status(403).json({
            error: "validation Error",
            errorInfo: {...validations.error.details}
        })
        
        return next()
        
    }
  
  

  

}

export default new Validation