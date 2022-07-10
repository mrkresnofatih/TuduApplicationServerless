import { ErrorCodes } from "../constants/errorCodes"

export const wrapFailResponse = (errorCode: ErrorCodes) => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ data: null, errorCode }),
        statusCode: 400
    }
}
    
export const wrapSuccessResponse = (data: any) => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            },
        body: JSON.stringify({ data, errorCode: null }),
        statusCode: 200
    }
}