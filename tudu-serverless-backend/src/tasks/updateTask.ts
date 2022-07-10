import { ErrorCodes } from "../constants/errorCodes";
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { extractUsernameFromToken } from "../utils/accessTokenHandler";
import { DynamoDB } from "aws-sdk";
import { checkAuthorization } from "../utils/authorizationCheckHandler";
import { UpdateTaskRequest } from "../models/updateTaskModel";
import { GetTaskResponse } from "../models/getTaskModel";

const dynamoDb = new DynamoDB.DocumentClient()

export const updateTask = (event, context, callback) => {
    checkAuthorization(
        event,
        () => {
            if (!event.body) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            
            const request : UpdateTaskRequest = JSON.parse(event.body);
            if (request.taskName === undefined || request.taskDescription === undefined || request.done === undefined || request.sk === undefined ) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
        
            extractUsernameFromToken(event.headers["Authorization"], (username) => {
                const task_pk : string = `IDENTITY@${username}`
                const updateParams : DynamoDB.UpdateParam = {
                    TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
                    Key: {
                        pk: task_pk,
                        sk: request.sk,
                    },
                    ExpressionAttributeValues: {
                        ':task_name': request.taskName,
                        ':task_desc': request.taskDescription,
                        ':task_done': request.done,
                    },
                    UpdateExpression: 'SET taskName = :task_name, taskDescription = :task_desc, done = :task_done',
                    ReturnValues: 'ALL_NEW'
                }
                dynamoDb.update(updateParams, (err, res) => {
                    if (err) {
                        callback(null, wrapFailResponse(ErrorCodes.ServerError));
                        return;
                    }
                    const response : GetTaskResponse = {
                        sk: res.Attributes["sk"],
                        taskName: res.Attributes["taskName"],
                        taskDescription: res.Attributes["taskDescription"],
                        done: res.Attributes["done"]
                    }
                    callback(null, wrapSuccessResponse(response));
                    return;
                })
            })
        },
        
        () => {
            callback(null, wrapFailResponse(ErrorCodes.NotAuthenticated));
            return;
        })
}