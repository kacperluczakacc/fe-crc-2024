import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Task } from "../../../App";

interface TaskState {
    taskList: Task[];
}

const initialTaskState: TaskState = {
    taskList: [
        {
          title: 'Task 1',
          author: 'Jakub',
          deadline: dayjs('2024/09/18')
        },
        {
          title: 'Task 2',
          author: 'Wiktoria',
          deadline: dayjs('2024/09/21')
        },
        {
          title: 'Task 3',
          author: 'Mateusz',
          deadline: dayjs('2024/09/19')
        }
    ]
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.taskList.push(action.payload);
        },
    },
})

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;