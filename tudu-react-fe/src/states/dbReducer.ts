import { Task } from "../models/task"
import { DbAction } from "./dbAction"
import { DbActionNames } from "./dbActionNames"

interface DbState {
    tasks: Record<string, Task>,
    lastId: string
}

const initialState : DbState = {
    tasks: {},
    lastId: "TASK@11111111111111"
}

const dbReducer = (state: DbState = initialState, action: DbAction): DbState => {
    switch (action.type) {
        case DbActionNames.ADD_TASK: {
            const data = action.data
            const newState : DbState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [data.sk]: {
                        id: data.sk,
                        taskName: data.taskName,
                        taskDescription: data.taskDescription,
                        done: data.done
                    }
                },
                lastId: data.sk
            }
            console.log(action.type, newState)
            return newState;
        }
        case DbActionNames.REMOVE_TASK: {
            const id = action.data;

            const newState: DbState = {
                ...state,
                lastId: (state.lastId===id) ? (Object.keys(state.tasks) as Array<string>)
                    .filter(key => key !== id)
                    .sort((a,b) => a.localeCompare(b))[(Object.keys(state.tasks) as Array<string>).length - 2] : state.lastId
            }
            
            delete newState.tasks[id];
            console.log(action.type, newState);
            return newState;
        }
        case DbActionNames.RESET: {
            return initialState
        }
        default:
            return state;
    }
}

export default dbReducer