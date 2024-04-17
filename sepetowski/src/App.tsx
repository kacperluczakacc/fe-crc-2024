import { useState } from 'react';
import { Task } from './types/types';
import { tasks as defaultTasks } from './data/tasks';
import { TasksContainer } from './components/tasks/TasksContainer';

export const App = () => {
	const [tasks, setTasks] = useState<Task[]>(defaultTasks);

	const addNewTaskHandler = (task: Task) => {
		setTasks((prev) => [...prev, task]);
	};

	return (
		<main className='container mx-auto p-6'>
			<section className='text-center'>
				<h1 className='text-5xl'>My tasks</h1>
			</section>
			<TasksContainer tasks={tasks} onAddNewTaskHandler={addNewTaskHandler} />
		</main>
	);
};
