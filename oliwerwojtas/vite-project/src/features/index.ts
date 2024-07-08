import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import taskSlice from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;

export const useTypedDispatch = useDispatch.withTypes<AppDisptach>();
export const useTypedSelector = useSelector.withTypes<RootState>();
