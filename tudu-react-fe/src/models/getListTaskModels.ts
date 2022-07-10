import { TaskReturnModel } from "./task";

export type GetListTaskRequestModel = {
    startingSortKey: string
}

export type GetListTaskResponseModel = TaskReturnModel[]