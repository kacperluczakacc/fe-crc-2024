import { Link } from 'react-router-dom'
import { Task as TaskType } from '../App'
import Task from '../components/Task'
import { ROUTE } from '../lib/constants'
import { MdFilterList } from 'react-icons/md'

import { IoMdAdd } from 'react-icons/io'

type taskListType = {
	tasks: TaskType[]
}

const TaskList = ({ tasks }: taskListType) => {
	return (
		<section className='p-4'>
			<div className='flex justify-between items-center mb-4'>
				<Link to={ROUTE.ADD_TASK}>
					<button className='bg-primary px-5 py-4 text-white font-semibold rounded-full flex justify-between items-center gap-2'>
						<IoMdAdd />
						New To-do
					</button>
				</Link>
				<MdFilterList className='ml-auto' size={24} />
			</div>

			{tasks.map(task => (
				<Task
					key={task?.title.replace(/ /g, '-')}
					title={task?.title}
					author={task?.author}
					deadline={task?.deadline}
				/>
			))}
		</section>
	)
}

export default TaskList
