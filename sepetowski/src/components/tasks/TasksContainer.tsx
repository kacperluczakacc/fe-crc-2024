import { Task as ITask } from '../../types/types';
import { AddTaskForm } from './AddTaskForm';
import { Task } from './Task';

interface Props {
	tasks: ITask[];
	onAddNewTaskHandler: (task: ITask) => void;
}

export const TasksContainer = ({ tasks, onAddNewTaskHandler }: Props) => {
	return (
		<div className='flex gap-4 mt-20 items-center justify-center flex-wrap'>
			{tasks.map((task) => (
				<Task key={task.id} task={task} />
			))}
			<AddTaskForm onAddNewTaskHandler={onAddNewTaskHandler} />
		</div>
	);
};
