import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { CustomDate } from '../../../pages/AddTask'

interface FormState {
	taskName: string
	deadline: string | null
	author: string
	customButtonDate: CustomDate | null
	formValid: boolean
	errors: {
		taskNameError: boolean
		deadlineError: boolean
		authorError: boolean
	}
}

const initialState: FormState = {
	taskName: '',
	deadline: null,
	author: '',
	customButtonDate: null,
	formValid: false,
	errors: {
		taskNameError: false,
		deadlineError: false,
		authorError: false,
	},
}

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setTaskName: (state, action: PayloadAction<string>) => {
			state.taskName = action.payload
			state.errors.taskNameError = action.payload.length > 0 && action.payload.length <= 2
		},
		setDeadline: (state, action: PayloadAction<string | null>) => {
			state.deadline = action.payload
			state.errors.deadlineError = action.payload === null
		},
		setAuthor: (state, action: PayloadAction<string>) => {
			state.author = action.payload
			state.errors.authorError = action.payload === ''
		},
		setCustomButtonDate: (state, action: PayloadAction<CustomDate | null>) => {
			state.customButtonDate = action.payload
			state.deadline =
				action.payload === CustomDate.TODAY
					? dayjs().format('DD-MM-YYYY')
					: action.payload === CustomDate.TOMORROW
					? dayjs().add(1, 'day').format('DD-MM-YYYY')
					: null
			state.errors.deadlineError = false
		},
		clearTaskNameError: state => {
			state.errors.taskNameError = false
		},
		clearAuthorError: state => {
			state.errors.authorError = false
		},
		clearDeadlineError: state => {
			state.errors.deadlineError = false
		},
		validateForm: state => {
			state.errors.taskNameError = (state.taskName.length > 0 && state.taskName.length <= 2) || state.taskName === ''
			state.errors.authorError = state.author === ''
			state.errors.deadlineError = state.deadline === null

			state.formValid =
				!state.errors.taskNameError &&
				state.taskName !== '' &&
				state.deadline !== null &&
				!state.errors.deadlineError &&
				state.author !== '' &&
				!state.errors.authorError
		},
		resetForm: () => initialState,
	},
})

export const {
	setTaskName,
	setDeadline,
	setAuthor,
	setCustomButtonDate,
	clearTaskNameError,
	clearAuthorError,
	clearDeadlineError,
	validateForm,
	resetForm,
} = formSlice.actions

export default formSlice.reducer
