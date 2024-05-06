import { Task } from '../App'
import { MdClose } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { ROUTE, RegExp } from '../lib/constants'
import { Link } from 'react-router-dom'

type AddTaskProps = {
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const AddTask = ({ setTasks }: AddTaskProps) => {
	const [taskName, setTaskName] = useState<string>('')
	const [deadline, setDeadline] = useState<string>('')
	const [author, setAuthor] = useState<string>('')
	const [linkActive, setLinkActive] = useState<boolean>(false)

	const [taskNameError, setTaskNameError] = useState<boolean>(false)
	const [deadlineError, setDeadlineError] = useState<boolean>(false)
	const [authorError, setAuthorError] = useState<boolean>(false)
	// const [author, setAuthor] = useState('')
	// const [deadline, setDeadline] = useState('')
	// const taskNameRef = useRef<HTMLInputElement>(null)
	// const authorRef = useRef<HTMLInputElement>(null)
	// const deadlineRef = useRef<HTMLInputElement>(null)

	const hideTaskError = () => {
		setTaskNameError(false)
	}

	const hideDeadlineError = () => {
		setDeadlineError(false)
	}

	const hideAuthorError = () => {
		setAuthorError(false)
	}

	const handleAddTask = () => {
		// if (taskNameRef.current && authorRef.current && deadlineRef.current) {
		// setTasks(prevTasks => [
		// 	title: taskNameRef.current!.value,
		// 	author: authorRef.current!.value,
		// 	deadline: deadlineRef.current!.value,
		// ])
		// }

		taskName === '' && setTaskNameError(true)
		taskName.length > 0 && taskName.length <= 2 && setTaskNameError(true)
		deadline === '' && deadline.length < 1 ? setDeadlineError(true) : setDeadlineError(false)
		author === '' && setAuthorError(true)

		RegExp.deadline.test(deadline) ? setDeadlineError(false) : setDeadlineError(true)

		if (linkActive) {
			setTasks(prevTasks => [...prevTasks, { title: taskName, author: author, deadline: deadline }])
		}
	}

	useEffect(() => {
		// setTaskNameError(taskName.length === 1)
		setTaskNameError(taskName.length > 0 && taskName.length <= 2)
	}, [taskName])

	useEffect(() => {
		!taskNameError &&
		taskName !== '' &&
		deadline !== '' &&
		!deadlineError &&
		author !== '' &&
		!authorError &&
		RegExp.deadline.test(deadline)
			? setLinkActive(true)
			: setLinkActive(false)
	}, [taskName, author, deadline, taskNameError])

	return (
		<section>
			{/* <button onClick={handleAddTask} type='button' className='border border-solid'>
				ADD TASK
			</button>
			<form className='flex flex-col' action=''>
				<label htmlFor=''>Task Name:</label>
				<input ref={taskNameRef} className='border' type='text' />
				<label htmlFor=''>Author:</label>
				<input ref={authorRef} className='border' type='text' />
				<label htmlFor=''>Deadline:</label>
				<input ref={deadlineRef} className='border' type='text' />
			</form> */}

			<div className='flex justify-between items-center p-4'>
				<Link to={ROUTE.HOME}>
					<MdClose size={24} />
				</Link>

				<h1 className='text-xl'>Create new task</h1>

				<Link to={linkActive ? ROUTE.HOME : ROUTE.ADD_TASK}>
					<button onClick={handleAddTask} className='text-primary font-bold'>
						Save
					</button>
				</Link>
			</div>
			<form className='flex flex-col gap-10 my-6 px-5 '>
				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Title:</label>
					<input
						onFocus={hideTaskError}
						onInput={input => {
							setTaskName(input.currentTarget.value)
						}}
						className={`border h-14 p-4 ${taskNameError && 'border-red-500'}`}
						type='text'
					/>

					<p className='text-red-500 h-5 text-sm'>
						{(taskName.length > 0 && taskName.length <= 2 && 'Title should be at least 3 characters') ||
							(taskNameError && 'Title is required.')}
					</p>
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Author:</label>
					<input
						onFocus={hideAuthorError}
						onInput={input => {
							setAuthor(input.currentTarget.value)
						}}
						className={`border h-14 p-4 ${authorError && 'border-red-500'}`}
						type='text'
					/>
					<p className='text-red-500 h-5 text-sm'>{authorError && 'Author is required.'}</p>
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline:</label>
					<input
						onFocus={hideDeadlineError}
						onInput={input => {
							setDeadline(input.currentTarget.value)
						}}
						className={`border h-14 p-4 ${deadlineError && 'border-red-500'}`}
						type='text'
					/>
					<p className='text-red-500 h-5 text-sm'>
						{(!RegExp.deadline.test(deadline) &&
							deadline.length > 0 &&
							'Deadline is in a wrong format (DD/MM/YYYY). Please correct') ||
							(deadlineError && 'Deadline is required.')}
					</p>
				</div>
			</form>
		</section>
	)
}

export default AddTask
