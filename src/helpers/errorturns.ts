import { object } from "joi"


export const returnError = (errorMessage: string, createOn: string) =>{
    return {error: true, madeOn: createOn, message: errorMessage}
}

export const conflictError = (errorInfo: string, reason: string) => {
    return {error: true, type: "conflict", message : errorInfo + "\n " + reason }
}

export const checkErrorExistsance = (dict: object) => {
    let dictArray = Object.keys(dict)
    let errorObj = {error: dictArray.some(key => key == "error"), conflict: dictArray.some(key => key == "conflict")}

    return errorObj
}

export const errorExist = (dict: object) => {
    return Object.keys(dict).some(key => key == "error")
}

