import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export type TaskType = {
  title: string;
  author: string;
  deadline: Dayjs;
};

interface TaskState {
  tasks: TaskType[];
}

const initialTaskState = {
  taskList: [
    {
      title: "Task 1",
      author: "Lukasz",
      deadline: dayjs("18/09/2025"),
    },
    {
      title: "Task 2",
      author: "Tomek",
      deadline: dayjs("24/09/2024"),
    },
    {
      title: "Task 3",
      author: "Gosia",
      deadline: dayjs("18/01/2025"),
    },
  ],
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
