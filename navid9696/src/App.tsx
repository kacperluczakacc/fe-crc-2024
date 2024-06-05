import { useState } from 'react'
import Task from './components/Task'
import { AddTask, TaskList } from './pages'
import { Route, Switch } from 'react-router-dom'
import { ROUTE } from './lib/constants'
import Header from './components/Header'

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
		// <main className='p-4 text-blue'>
		// 	<section className='flex flex-col gap-8'>
		// 		<h1 className='text-4xl font-bold'>My Tasks</h1>
		// 		<AddTask setTasks={setTasks} />
		// 		<TaskList tasks={tasks} />
		// 	</section>
		// </main>
		<>
			<Header />
			<Switch>
				<Route path={ROUTE.ADD_TASK}>
					<AddTask setTasks={setTasks} />
				</Route>
				<Route path={ROUTE.HOME}>
					<TaskList tasks={tasks} />
				</Route>
			</Switch>
		</>
	)
}

export default App
