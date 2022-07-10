export type GetTaskRequest = {
    sk: string
}

export type GetTaskResponse = {
    sk: string,
    taskName: string,
    taskDescription: string,
    done: boolean
}