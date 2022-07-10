import axios from "axios";
import { DeleteRequestModel, DeleteResponseModel } from "../models/deleteTaskModel";
import { batchDispatch } from "../states/batchDispatch";
import { ReduxAction, store } from "../states/main";
import { apiConfig } from "./apiConfig";

export const deleteTaskAPI = (
    id: string,
    successDispatch: (taskId: string) => ReduxAction[]
) => {
    const deletePacket : DeleteRequestModel = {
        sk: id
    }

    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/task/deleteTask`,
        data: deletePacket,
        headers: {
            "Authorization": store.getState().auth.accessToken
        }
    }).then((response) => {
        const {data, errorCode} = response.data;
        if (errorCode === null) {
            batchDispatch([
                ...(successDispatch((data as DeleteResponseModel).sk))
            ])
        }
    })
}