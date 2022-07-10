import axios from "axios";
import { TaskReturnModel } from "../models/task";
import { batchDispatch } from "../states/batchDispatch";
import { ReduxAction, store } from "../states/main";
import { apiConfig } from "./apiConfig";

export const toggleTaskAPI = (
    taskId : string,
    successDispatch: (result: TaskReturnModel) => ReduxAction[]
) => {
    const targetTask = store.getState().db.tasks[taskId];
    const packet : TaskReturnModel = {
        sk: targetTask.id,
        taskName: targetTask.taskName,
        taskDescription: targetTask.taskDescription,
        done: !targetTask.done
    }

    axios({
        method: 'post',
        url: `${apiConfig.baseUrl}/task/updateTask`,
        data: packet,
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