import { TaskReturnModel } from "../models/task";
import { DbAction } from "./dbAction";
import { DbActionNames } from "./dbActionNames";

export const DbAddTask = (task: TaskReturnModel) : DbAction => {
    return {
        type: DbActionNames.ADD_TASK,
        data: task
    }
}

export const DbRemoveTask = (taskId: string) : DbAction => {
    return {
        type: DbActionNames.REMOVE_TASK,
        data: taskId
    }
}

export const DbReset = (): DbAction => {
    return {
        type: DbActionNames.RESET
    }
}