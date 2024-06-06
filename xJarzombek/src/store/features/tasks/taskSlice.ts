import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs";
import { TaskType } from "../../../App";

interface TaskState{
    taskList: TaskType[];
}

const initialTaskState: TaskState = {
    taskList: [
        {
            title: 'Task 1',
            author: 'Kacper',
            deadline: dayjs("2024-10-22").toString()
          },
          {
            title: 'Task 2',
            author: 'Gosia',
            deadline: dayjs("2024-06-11").toString()
          },
          {
            title: 'Task 3',
            author: 'Tomek',
            deadline: dayjs("2025-03-19").toString()
          }
    ]
}

export const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.taskList.push(action.payload);
        }
    }
})

export const {addTask} = taskSlice.actions;

export default taskSlice.reducer;