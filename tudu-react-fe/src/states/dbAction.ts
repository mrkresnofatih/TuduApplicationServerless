import { TaskReturnModel } from "../models/task";
import { DbActionNames } from "./dbActionNames";

interface DbAddTaskActionType {
    type: DbActionNames.ADD_TASK,
    data: TaskReturnModel
}

interface DbRemoveTaskActionType {
    type: DbActionNames.REMOVE_TASK,
    data: string
}

interface DbResetActionType {
    type: DbActionNames.RESET
}

export type DbAction = DbAddTaskActionType | DbRemoveTaskActionType | DbResetActionType