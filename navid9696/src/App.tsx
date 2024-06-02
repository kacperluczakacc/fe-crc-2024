import Task from './components/Task'
import { AddTask, TaskList } from './pages'
import { Route, Switch } from 'react-router-dom'
import { ROUTE } from './lib/constants'
import Header from './components/Header'

export type Task = {
	id:string
	title: string
	author: string
	deadline: string | undefined
}

const App = () => {

	return (
		<>
			<Header />
			<Switch>
				<Route path={ROUTE.ADD_TASK}>
					<AddTask />
				</Route>
				<Route path={ROUTE.HOME}>
					<TaskList />
				</Route>
			</Switch>
		</>
	)
}

export default App
