import { Task } from "../models/task";
import { AllState } from "./main";

export const dbTaskSelector = (id: string) => (state: AllState): Task => state.db.tasks[id]

export const dbTasksSelector = (state: AllState): Task[] => (Object.values(state.db.tasks) as Array<Task>).sort((a,b) => a.id.localeCompare(b.id))