import { ErrorCodes } from '../constants/errorCodes';
import { SignupRequest, SignupResponse } from '../models/signupModel';
import { wrapFailResponse, wrapSuccessResponse } from '../utils/responseHandler';
import { scramble } from '../utils/scrambleHandler';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient()

export const signup = (event, context, callback) => {
    if (!event.body) {
        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
        return;
    }
    
    const data : SignupRequest = JSON.parse(event.body);
    if (!data.fullName || !data.username || !data.password || !data.occupation) {
        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
        return;
    }
    
    const auth_pk = `IDENTITY@${data.username}`
    const auth_sk = `AUTH@${data.username}` 
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
        Item: {
            pk: auth_pk,
            sk: auth_sk,
            username: data.username,
            fullName: data.fullName,
            password: scramble(data.password),
            occupation: data.occupation
        }
    }
    
    dynamoDb.put(params, (error, _) => {
        if (error) {
            callback(null, wrapFailResponse(ErrorCodes.ServerError));
            return;
        } else {
            const response : SignupResponse = {
                username: data.username,
                fullName: data.fullName
            }
            callback(null, wrapSuccessResponse(response));
            return;
        }
    })
}