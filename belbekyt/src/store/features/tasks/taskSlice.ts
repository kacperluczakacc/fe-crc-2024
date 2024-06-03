import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"
import { TaskType } from "../../../App";

interface TaskState {
    taskList: TaskType[];
}

const initialTaskState: TaskState = {
    taskList: [
        {
            title: "Task 1",
            author: "Kacper",
            deadline: dayjs("2025-09-01").toString()
        }
    ]
}

export const taskSlice = createSlice({
    name: 'tasks', 
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.taskList.push(action.payload);
        },
    },
});

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer;