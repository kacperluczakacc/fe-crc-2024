import { useState } from 'react';
import { AddTask, Home } from './pages';
import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './lib/routes';
import { Task } from './types/types';
import { Header } from './components/Header';

const mockTasks: Task[] = [
	{
		title: 'Task 1',
		author: 'xyz',
		deadline: '18/09/2025',
	},
	{
		title: 'Task 2',
		author: 'xyz',
		deadline: '18/09/2024',
	},
	{
		title: 'Task 3',
		author: 'xyz',
		deadline: '18/01/2025',
	},
];

const App = () => {
	const [tasks, setTasks] = useState<Task[]>(mockTasks);

	const addTaskHandler = (task: Task) => {
		setTasks((prev) => [...prev, task]);
	};

	return (
		<>
			<Header />
			<Switch>
				<Route path={ROUTE.ADD_TASK}>
					<AddTask onAddTask={addTaskHandler} />
				</Route>
				<Route path={ROUTE.HOME}>
					<Home tasks={tasks} />
				</Route>
			</Switch>
		</>
	);
};

export default App;
