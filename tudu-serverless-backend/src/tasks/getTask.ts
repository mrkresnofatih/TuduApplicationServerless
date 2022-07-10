import { ErrorCodes } from "../constants/errorCodes";
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { extractUsernameFromToken } from "../utils/accessTokenHandler";
import { DynamoDB } from "aws-sdk";
import { checkAuthorization } from "../utils/authorizationCheckHandler";
import { GetTaskRequest, GetTaskResponse } from '../models/getTaskModel'

const dynamoDb = new DynamoDB.DocumentClient()

export const getTask = (event, context, callback) => {
    checkAuthorization(
        event,
        () => {
            if (!event.body) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            const request : GetTaskRequest = JSON.parse(event.body);
            if (!request.sk) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            
            extractUsernameFromToken(event.headers["Authorization"], (username) => {
                const task_pk : string = `IDENTITY@${username}`;
                
                const params = {
                    TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
                    Key: {
                        pk: task_pk,
                        sk: request.sk
                    }
                }
                
                dynamoDb.get(params, (error, result) => {
                    if (error) {
                        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                        return;
                    } 
                    else
                    {
                        const response : GetTaskResponse = {
                            sk: result.Item["sk"],
                            taskName: result.Item["taskName"],
                            taskDescription: result.Item["taskDescription"],
                            done: result.Item["done"]
                        }
                        callback(null, wrapSuccessResponse(response));
                        return;
                    }
                })
            })
        },
        
        () => {
            callback(null, wrapFailResponse(ErrorCodes.NotAuthenticated));
            return;
        })
}