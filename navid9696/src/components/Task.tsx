import { Task as TaskType } from '../App'

const Task = ({ title, author, deadline }: TaskType) => {
	return (
		<div>
			<p className='text-xl'>{title}</p>
			<p className='font-medium'>{author}</p>
			<p className=''>{deadline}</p>
		</div>
	)
}

export default Task
