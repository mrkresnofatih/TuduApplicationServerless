export type AddTaskRequestModel = {
    taskName: string,
    taskDescription: string,
}

export type AddTaskResponseModel = {
    sk: string,
    taskName: string,
    taskDescription: string,
    done: boolean
}