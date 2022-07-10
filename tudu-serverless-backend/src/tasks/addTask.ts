import { ErrorCodes } from "../constants/errorCodes";
import { AddTaskRequest, AddTaskResponse } from '../models/addTaskModel'
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { extractUsernameFromToken } from "../utils/accessTokenHandler";
import { DynamoDB } from "aws-sdk";
import { checkAuthorization } from "../utils/authorizationCheckHandler";
import { generateTaskId } from "../utils/generateTaskId";

const dynamoDb = new DynamoDB.DocumentClient()

export const addTask = (event, context, callback) => {
    checkAuthorization(
        event,
        () => {
            if (!event.body) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }
            
            const data : AddTaskRequest = JSON.parse(event.body)
            if (!data.taskName || !data.taskDescription) {
                callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                return;
            }

            extractUsernameFromToken(event.headers["Authorization"], (username) => {
                const task_pk = `IDENTITY@${username}`
                const taskId  = generateTaskId()
                const task_sk = `TASK@${taskId}`
            
                const params = {
                    TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
                    Item: {
                        pk: task_pk,
                        sk: task_sk,
                        taskName: data.taskName,
                        taskDescription: data.taskDescription,
                        done: false
                    }
                }
            
                dynamoDb.put(params, (error, _) => {
                    if (error) {
                        callback(null, wrapFailResponse(ErrorCodes.BadRequest));
                        return;
                    } else {
                        const response : AddTaskResponse = {
                            sk: task_sk,
                            taskName: data.taskName,
                            taskDescription: data.taskDescription,
                            done: false
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
        }
    )
    
}