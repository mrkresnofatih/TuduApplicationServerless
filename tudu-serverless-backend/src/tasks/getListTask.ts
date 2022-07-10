import { ErrorCodes } from "../constants/errorCodes";
import { wrapFailResponse, wrapSuccessResponse } from "../utils/responseHandler";
import { extractUsernameFromToken } from "../utils/accessTokenHandler";
import { DynamoDB } from "aws-sdk";
import { checkAuthorization } from "../utils/authorizationCheckHandler";
import { GetListTaskModel } from '../models/getListTaskModel'

const dynamoDb = new DynamoDB.DocumentClient()

export const getListTask = (event, context, callback) => {
    checkAuthorization(
        event,
        
        () => {
            const request : GetListTaskModel = event.body ? JSON.parse(event.body) : null;
            const startingSortKey : string = (request === null) ? "TASK@11111111111111" : request.startingSortKey;
            
            extractUsernameFromToken(event.headers["Authorization"], (username) => {
                const task_pk = `IDENTITY@${username}`
                
                const params = {
                    TableName: process.env.DYNAMODB_TABLE ?? "tuduAppDb",
                    KeyConditionExpression: "pk = :partitionKey AND sk BETWEEN :start AND :end",
                    ExpressionAttributeValues: {
                        ":partitionKey": task_pk,
                        ":start": startingSortKey,
                        ":end": "TASK@99999999999999"
                    },
                    ProjectionExpression: "sk, taskName, taskDescription, done",
                    Limit: 10
                }
                
                dynamoDb.query(params, (error, result) => {
                    if (error) {
                        callback(null, wrapFailResponse(ErrorCodes.ServerError));
                        return;
                    } else {
                        callback(null, wrapSuccessResponse(result.Items))
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