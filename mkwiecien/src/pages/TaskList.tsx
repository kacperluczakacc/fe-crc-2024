import { Link } from 'react-router-dom'
import { IoMdAdd as AddIcon } from 'react-icons/io'
import { MdFilterList as FilterIcon } from 'react-icons/md'

import { Task as TaskType } from '../App'
import Task from '../components/Task'
import { ROUTE } from '../lib/constants'

type TaskListType = {
	tasks: TaskType[]
}

export default function TaskList({ tasks }: TaskListType) {
	return (
		<section className='p-4'>
			<div className='justify-between flex items-center'>
				<Link to={ROUTE.ADD_TASK}>
					<button className='bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2'>
						<AddIcon />
						New To-do
					</button>
				</Link>
				<FilterIcon size={24} />
			</div>

			{tasks.map(task => (
				<Task key={task.title.replace(/ /g, '-')} title={task.title} author={task.author} deadline={task.deadline} />
			))}
		</section>
	)
}
