import { MdClose } from 'react-icons/md'
import { useEffect } from 'react'
import { ERROR_MESSAGES, ROUTE } from '../lib/constants'
import { Link, useHistory } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import InputField from '../components/Input'
import DateButton from '../components/DateButton'
import { useTypedDispatch, useTypedSelector } from '../store'
import { Endpoint } from '../api/constans'
import { v4 as uuidv4 } from 'uuid'
import {
	resetForm,
	setAuthor,
	setCustomButtonDate,
	setDeadline,
	setTaskName,
	validateForm,
	clearTaskNameError,
	clearAuthorError,
	clearDeadlineError,
} from '../store/features/tasks/formSlice'

export enum CustomDate {
	TODAY,
	TOMORROW,
}

const AddTask = () => {
	const updateStore = useTypedDispatch()
	const { taskName, deadline, author, customButtonDate, errors, formValid } = useTypedSelector(state => state.form)
	const history = useHistory()

	const addNewTaskToServer = async () => {
		const res = await fetch(Endpoint.TASKS, {
			method: 'POST',
			body: JSON.stringify({
				id: uuidv4(),
				title: taskName,
				author,
				deadline: deadline!,
			}),
		})
		return res
	}

	const handleAddTask = async () => {
		if (formValid) {
			const res = await addNewTaskToServer()
			if (res.ok) {
				updateStore(resetForm())
				history.push(ROUTE.HOME)
			}
		}
	}

	useEffect(() => {
		if (taskName !== '' && deadline !== null && author !== '') {
			updateStore(validateForm())
		}
	}, [taskName, deadline, author])

	return (
		<section>
			<div className='flex justify-between items-center p-4'>
				<Link to={ROUTE.HOME}>
					<MdClose size={24} />
				</Link>
				<h1 className='text-xl'>Create new task</h1>

				<button onClick={handleAddTask} className='text-primary font-bold'>
					Save
				</button>
			</div>
			<form className='flex flex-col gap-10 my-6 px-5 '>
				<InputField
					label='Task name:'
					value={taskName}
					onChange={e => updateStore(setTaskName(e.currentTarget.value))}
					error={errors.taskNameError}
					errorMessage={
						taskName.length > 0 && taskName.length < 3 ? ERROR_MESSAGES.taskNameShort : ERROR_MESSAGES.taskNameRequired
					}
					onFocus={() => updateStore(clearTaskNameError())}
				/>
				<InputField
					label='Author:'
					value={author}
					onChange={e => updateStore(setAuthor(e.currentTarget.value))}
					error={errors.authorError}
					errorMessage={ERROR_MESSAGES.authorRequired}
					onFocus={() => updateStore(clearAuthorError())}
				/>

				<div className='flex gap-4'>
					<DateButton
						date={CustomDate.TODAY}
						onClick={() => {
							updateStore(setCustomButtonDate(CustomDate.TODAY))
						}}
						customButtonDate={customButtonDate}
					/>
					<DateButton
						date={CustomDate.TOMORROW}
						onClick={() => {
							updateStore(setCustomButtonDate(CustomDate.TOMORROW))
						}}
						customButtonDate={customButtonDate}
					/>
				</div>
				<p>or select your date</p>
				<div>
					<DatePicker
						className='w-full'
						onChange={date => {
							updateStore(setDeadline(date ? date.format('DD-MM-YYYY') : null))
						}}
						onOpen={() => {
							updateStore(clearDeadlineError())
							updateStore(setCustomButtonDate(null))
						}}
						value={customButtonDate !== null ? null : deadline ? dayjs(deadline, 'DD-MM-YYYY') : null}
						format='DD-MM-YYYY'
					/>

					<p className='text-red-500 h-5 text-sm'>{errors.deadlineError && `${ERROR_MESSAGES.deadlineRequired}`}</p>
				</div>
			</form>
		</section>
	)
}

export default AddTask
