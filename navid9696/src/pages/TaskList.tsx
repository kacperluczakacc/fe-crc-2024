import { Link } from 'react-router-dom'
import Task from '../components/Task'
import { ROUTE } from '../lib/constants'
import { MdFilterList } from 'react-icons/md'
import { IoMdAdd, IoMdTrash } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { Task as TaskType } from '../App'
import { Endpoint } from '../api/constans'

const TaskList = () => {
	const [tasks, setTasks] = useState<TaskType[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [checkedTaskId, setCheckedTaskId] = useState<string[]>([])

	const getAllTasks = async () => {
		setIsLoading(true)
		const res = await fetch(Endpoint.TASKS)
		const tasks = await res.json()

		if (tasks) {
			setIsLoading(false)
			setTasks(tasks)
		} else {
			setIsLoading(false)
			setError('Something went wrong. Please try again.')
		}
	}

	const deleteTask = async (id: string) => {
		await fetch(`${Endpoint.TASKS}/${id}`, {
			method: 'DELETE',
		})
		setCheckedTaskId([])
		getAllTasks()
	}

	useEffect(() => {
		getAllTasks()
	}, [])

	return (
		<section className='p-4'>
			<div className='flex justify-between items-center mb-4'>
				<Link to={ROUTE.ADD_TASK}>
					<button className='bg-primary px-5 py-4 text-white font-semibold rounded-full flex justify-between items-center gap-2'>
						<IoMdAdd />
						New To-do
					</button>
				</Link>
				<div className='flex gap-4'>
					<MdFilterList className='hover:cursor-pointer' size={24} />
					{checkedTaskId.length > 0 && (
						<IoMdTrash
							onClick={() => checkedTaskId.forEach(taskId => deleteTask(taskId))}
							className='hover:cursor-pointer hover:text-red-500 transition-colors'
							size={24}
						/>
					)}
				</div>
			</div>

			{isLoading ? (
				<p>Loading...</p>
			) : error.length > 0 ? (
				<p>{error}</p>
			) : (
				tasks.map(task => (
					<Task
						id={task?.id}
						key={task?.id}
						title={task?.title}
						author={task?.author}
						deadline={task?.deadline}
						setCheckedTaskId={setCheckedTaskId}
					/>
				))
			)}
		</section>
	)
}

export default TaskList
