import { configureStore } from "@reduxjs/toolkit";
import { RootOptions } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import taskSlice from "../features/task/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
export const useTypedSelector = useSelector.withTypes<RootOptions>();
