import { ErrorCodes } from "../constants/errorCodes";
import { DynamoDB } from "aws-sdk";
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { LoginRequest, LoginResponse } from '../models/loginModel';
import { compare } from "../utils/scrambleHandler";
import { createAccessToken } from "../utils/accessTokenHandler";

const dynamoDb = new DynamoDB.DocumentClient()

export const login = (event, context, callback) => {
    if (!event.body) {
        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
        return;
    }
    
    const data : LoginRequest = JSON.parse(event.body);
    if (!data.username || !data.password) {
        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
        return;
    }
    
    const auth_pk = `IDENTITY@${data.username}`
    const auth_sk = `AUTH@${data.username}`
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
        Key: {
            pk: auth_pk,
            sk: auth_sk
        }
    }
    
    dynamoDb.get(params, (error, result) => {
        if (error) {
            callback(null, wrapFailResponse(ErrorCodes.ServerError));
            return;
        } else {
            const res = result.Item
            const passwordCorrect : boolean = compare(data.password, res["password"])
            
            if (!passwordCorrect) {
                callback(null, wrapFailResponse(ErrorCodes.InvalidCredentials));
                return;
            }

            createAccessToken(data.username, (token) => {
                const response : LoginResponse = {
                    username: data.username,
                    accessToken: token,
                    fullName: res["fullName"],
                    occupation: res["occupation"]
                }
                callback(null, wrapSuccessResponse(response));
                return;
            })
        }
    })
}