import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export type TaskT = {
    title: string,
    author: string,
    deadline: Dayjs,
  }

interface TaskState {
    taskList: TaskT[]
}

const initialTaskState: TaskState = {
    taskList: [
        {
            title: "Task 1",
            author: "Dawid",
            deadline: dayjs("18-04-2024")
        },
        {
            title: "Task 2",
            author: "Dawid",
            deadline: dayjs("18-04-2024")
        },
        {
            title: "Task 3",
            author: "Dawid",
            deadline: dayjs("18-04-2024")
        },
    ]
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskT>) => {
            state.taskList.push(action.payload)
        },
        dropTask: (state, action) => {
            state.taskList.splice(action.payload, 1)
        }
    }
})

export const {addTask } = taskSlice.actions
export const {dropTask } = taskSlice.actions

export default taskSlice.reducer