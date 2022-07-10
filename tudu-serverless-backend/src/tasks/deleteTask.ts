import { ErrorCodes } from "../constants/errorCodes";
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { extractUsernameFromToken } from "../utils/accessTokenHandler";
import { DynamoDB } from "aws-sdk";
import { checkAuthorization } from "../utils/authorizationCheckHandler";
import { DeleteTaskRequest, DeleteTaskResponse } from '../models/deleteTaskModel';

const dynamoDb = new DynamoDB.DocumentClient()

export const deleteTask = (event, context, callback) => {
    checkAuthorization(
        event,
        () => {
            if (!event.body) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            
            const request : DeleteTaskRequest = JSON.parse(event.body);
            if (request.sk === undefined) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            
            extractUsernameFromToken(event.headers["Authorization"], (username) => {
                const task_pk : string = `IDENTITY@${username}`
                
                const params = {
                    TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
                    Key: {
                        pk: task_pk,
                        sk: request.sk
                    }
                }
                
                dynamoDb.delete(params, (err) => {
                    if (err) {
                        callback(null, wrapFailResponse(ErrorCodes.ServerError));
                        return;
                    } else {
                        const res : DeleteTaskResponse = {
                            sk: request.sk,
                            deleted: true
                        }
                        callback(null, wrapSuccessResponse(res));
                        return;
            
                    }
                })
            })
        },

        () => {
            callback(null, wrapFailResponse(ErrorCodes.NotAuthenticated));
            return;
        }
    )
}