import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Task } from "../../../App";

interface TaskState { taskList: Task[] }

const initialTaskState: TaskState = {
    taskList: [
        { id: "1", title: "Task 1", author: "Kacper", deadline: dayjs("18/09/2025").toString() },
        { id: "2", title: "Task 2", author: "Tomek", deadline: dayjs("18/09/2024").toString() },
        { id: "3", title: "Task 3", author: "Gosia", deadline: dayjs("18/01/2025").toString() }
    ]
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload)
        }
    }
})

export const { addTask } = taskSlice.actions
export default taskSlice.reducer