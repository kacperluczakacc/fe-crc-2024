import { MdClose as CloseIcon } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Task } from '../App'
import { RegExp } from '../lib/constants'

type AddTaskProps = {
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({ setTasks }: AddTaskProps) {
	const [taskName, setTaskName] = useState('')
	const [taskNameError, setTaskNameError] = useState(false)
	const [deadline, setDeadline] = useState('')
	const [deadlineError, setDeadlineError] = useState(false)

	function hideTaskNameError() {
		setTaskNameError(prevState => !prevState)
	}

	function hideDeadlineError() {
		setDeadlineError(prevState => !prevState)
	}

	useEffect(() => {
		setTaskNameError(taskName.length === 1)
		setDeadlineError(RegExp.deadline.test(deadline))
	}, [taskName, deadline])

	function handleAddTask() {
		// setTasks(prevTasks => [
		// 	...prevTasks,
		// 	{
		// 		title: taskNameRef.current!.value,
		// 		author: authorRef.current!.value,
		// 		deadline: deadlineRef.current!.value,
		// 	},
		// ])
	}

	return (
		<section>
			{/* <button onClick={handleAddTask} type='button' className='border border-solid'>
				ADD TASK
			</button>
			<form className='flex flex-col gap-1 my-2'>
				<label>Task name:</label>
				<input ref={taskNameRef} className='border' type='text' />
				<label>Author:</label>
				<input ref={authorRef} className='border' type='text' />
				<label>Deadline:</label>
				<input ref={deadlineRef} className='border' type='text' />
			</form> */}
			<div className='flex justify-between items-center p-4'>
				<CloseIcon size={24} />
				<h1 className='text-xl'>Create new task</h1>
				<button onClick={handleAddTask} className='text-primary font-bold'>
					Save
				</button>
			</div>
			<form className='flex flex-col gap-10 my-6 px-5'>
				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Task name:</label>
					<input
						onFocus={hideTaskNameError}
						onInput={input => {
							setTaskName(input.currentTarget.value)
						}}
						className='border h-14 p-4'
						type='text'
					/>
					{taskNameError && <p>Task name is empty. Please add text.</p>}
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Author:</label>
					<input className='border h-14 p-4' type='text' />
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline:</label>
					<input
						onFocus={hideDeadlineError}
						onInput={input => setDeadline(input.currentTarget.value)}
						className='border h-14 p-4'
						type='text'
					/>
					{deadlineError && <p>Deadline is in a wrong format (DD/MM/YYYY). Please correct.</p>}
				</div>
			</form>
		</section>
	)
}
