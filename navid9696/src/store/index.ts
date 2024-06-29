import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import taskSlice from './features/tasks/taskSlice'
import formSlice from './features/tasks/formSlice'

export const store = configureStore({
	reducer: {
		tasks: taskSlice,
		form: formSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedDispatch = useDispatch.withTypes<AppDispatch>()
export const useTypedSelector = useSelector.withTypes<RootState>()
