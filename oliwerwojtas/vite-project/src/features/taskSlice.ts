import dayjs from "dayjs";

import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Task } from "../App";
interface TaskState {
  taskList: Task[];
}
const initialTaskState: TaskState = {
  taskList: [
    {
      title: "Task 1",
      author: "Oliwer",
      deadline: dayjs("12/09/2025").toString(),
    },
    {
      title: "Task 2",
      author: "Wiktoria",
      deadline: dayjs("8/10/2025").toString(),
    },
    {
      title: "Task 3",
      author: "Andrzej",
      deadline: dayjs("8/01/2025").toString(),
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
