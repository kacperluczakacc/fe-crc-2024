import { useState } from 'react'
import Task from './components/Task'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'

export type Task = {
	title: string
	author: string
	deadline: string
}

const mockTasks: Task[] = [
	{
		title: 'Task 1',
		author: 'Dawid',
		deadline: '18/09/2025',
	},
	{
		title: 'Task 2',
		author: 'Kacper',
		deadline: '18/05/2025',
	},
	{
		title: 'Task 3',
		author: 'Łucja',
		deadline: '18/01/2025',
	},
]

const App = () => {
	const [tasks, setTasks] = useState(mockTasks)

	return (
		<main className='p-4 text-blue'>
			<section className='flex flex-col gap-8'>
				<h1 className='text-4xl font-bold'>My Tasks</h1>
				<AddTask setTasks={setTasks} />
				<TaskList tasks={tasks} />
			</section>
		</main>
	)
}

export default App
