import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import taskSlice from "./features/tasks/taskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//useSelector => hook bedzie nam zwracac wartosc ze storea
//useDispatch => hook umozliwi nam zdispatchowanie akcji do reduxa

export const useTypedDispatch = useDispatch.withTypes<AppDispatch>()
export const useTypedSelector = useSelector.withTypes<RootState>()