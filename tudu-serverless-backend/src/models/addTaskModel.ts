export type AddTaskRequest = {
    taskName: string,
    taskDescription: string,
}

export type AddTaskResponse = {
    sk: string,
    taskName: string,
    taskDescription: string,
    done: boolean
}