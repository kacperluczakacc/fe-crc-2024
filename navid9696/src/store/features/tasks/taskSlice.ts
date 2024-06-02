import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../../../App'

interface TaskState {
	taskList: Task[]
}

const initialTaskState: TaskState = {
	taskList: [],
}

export const taskSlice = createSlice({
	name: 'tasks',
	initialState: initialTaskState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.taskList.push(action.payload)
		},
	},
})

export const { addTask } = taskSlice.actions
export default taskSlice.reducer
