import { useRef } from 'react'
import { Task } from '../App'

type AddTaskProps = {
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const AddTask = ({ setTasks }: AddTaskProps) => {
	// const [taskName, setTaskName] = useState('')
	// const [author, setAuthor] = useState('')
	// const [deadline, setDeadline] = useState('')
	const taskNameRef = useRef<HTMLInputElement>(null)
	const authorRef = useRef<HTMLInputElement>(null)
	const deadlineRef = useRef<HTMLInputElement>(null)

	const handleAddTask = () => {
		if (taskNameRef.current && authorRef.current && deadlineRef.current) {
			setTasks(prevTasks => [
				...prevTasks,
				{
					title: taskNameRef.current!.value,
					author: authorRef.current!.value,
					deadline: deadlineRef.current!.value,
				},
			])
		}
	}
	return (
		<div>
			<button onClick={handleAddTask} type='button' className='border border-solid'>
				ADD TASK
			</button>
			<form className='flex flex-col' action=''>
				<label htmlFor=''>Task Name:</label>
				<input ref={taskNameRef} className='border' type='text' />
				<label htmlFor=''>Author:</label>
				<input ref={authorRef} className='border' type='text' />
				<label htmlFor=''>Deadline:</label>
				<input ref={deadlineRef} className='border' type='text' />
			</form>
		</div>
	)
}

export default AddTask
