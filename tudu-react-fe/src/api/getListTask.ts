import axios from "axios";
import { GetListTaskRequestModel } from "../models/getListTaskModels";
import { TaskReturnModel } from "../models/task";
import { batchDispatch } from "../states/batchDispatch";
import { ReduxAction, store } from "../states/main";
import { apiConfig } from "./apiConfig";

export const getListTaskAPI = (
    successDispatch: (result: TaskReturnModel[]) => ReduxAction[]
) => {
    const getListTaskRequest : GetListTaskRequestModel = {
        startingSortKey: store.getState().db.lastId
    }

    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/task/getListTask`,
        data: getListTaskRequest,
        headers: {
            "Authorization": store.getState().auth.accessToken
        }
    }).then((response) => {
        const {data, errorCode} = response.data;
        console.log("API-GETLISTTASK: ", data)
        if (errorCode === null) {
            batchDispatch([
                ...(successDispatch(data))
            ])
        }
    })
}