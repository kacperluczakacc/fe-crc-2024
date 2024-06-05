import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { TaskType } from "../../../types/Task";

interface TaskState {
    taskList: TaskType[];
}

const initialTaskState: TaskState = {
    taskList: [],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.taskList.push(action.payload);
        },
    },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
