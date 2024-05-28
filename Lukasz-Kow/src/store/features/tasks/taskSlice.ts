import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Task } from "../../../App";

interface TaskState {
    taskList: Task[];
}

const initialTaskState: TaskState = {
    taskList: [
        {
            title: "Task 1",
            author: "Kacper",
            deadline: dayjs("2025-09-01").toString(),
        },
        {
            title: "Task 2",
            author: "Tomek",
            deadline: dayjs("2024-11-12").toString(),
        },
        {
            title: "Task 3",
            author: "Gosia",
            deadline: dayjs("2026-02-04").toString(),
        },
    ],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload);
        },
    },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;