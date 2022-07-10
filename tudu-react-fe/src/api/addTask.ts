import axios from "axios";
import { AddTaskRequestModel, AddTaskResponseModel } from "../models/addTaskModels";
import { batchDispatch } from "../states/batchDispatch";
import { ReduxAction, store } from "../states/main";
import { apiConfig } from "./apiConfig";

export const addTaskAPI = (
    addTaskRequest : AddTaskRequestModel,
    successDispatch: (result: AddTaskResponseModel) => ReduxAction[]
) => {
    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/task/addTask`,
        data: addTaskRequest,
        headers: {
            "Authorization": store.getState().auth.accessToken
        }
    }).then((response) => {
        const {data, errorCode} = response.data;
        if (errorCode === null) {
            batchDispatch([
                ...(successDispatch(data))
            ])
        }
    })
}