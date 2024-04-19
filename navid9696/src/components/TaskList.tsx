import { Task as TaskType } from '../App'
import Task from './Task'

type taskListType = {
	tasks: TaskType[]
}

const TaskList = ({ tasks }: taskListType) => {
	return (
		<div>
			{tasks.map(task => (
				<Task
					key={task?.title.replace(/ /g, '-')}
					title={task?.title}
					author={task?.author}
					deadline={task?.deadline}
				/>
			))}
		</div>
	)
}

export default TaskList
