import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskReducer'
import taskDeleteReducer from './reducers/taskDeleteReducer'

export const store =  configureStore({
    reducer: {
        tasks: taskReducer,
        tasksToDelete: taskDeleteReducer
    }
  })  

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
