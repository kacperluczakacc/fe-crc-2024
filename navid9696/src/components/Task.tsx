import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { FaRegSquareCheck } from 'react-icons/fa6'
import { Task as TaskType } from '../App'
import { useState } from 'react'

const Task = ({ title, author, deadline }: TaskType) => {
	const [isChecked, setIsChecked] = useState(false)

	const toggleCheck = () => {
		setIsChecked(prevState => !prevState)
	}

	return (
		<div
			onClick={toggleCheck}
			className='bg-secondary transition-colors active:bg-primary active:rounded-2xl my-4 p-4 flex justify-between items-center shadow-md'>
			<div>
				<p className=''>{deadline}</p>
				<p className='text-xl font-bold'>{title}</p>
				<p className='text-slate-600'>{author}</p>
			</div>
			{isChecked ? <FaRegSquareCheck size={24} /> : <MdCheckBoxOutlineBlank size={24} />}
		</div>
	)
}

export default Task
