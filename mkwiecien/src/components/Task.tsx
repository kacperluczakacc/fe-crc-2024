import { MdOutlineCheckBoxOutlineBlank as EmptyCheckbox, MdOutlineCheckBox as CheckedCheckbox } from 'react-icons/md'

import { Task as TaskType } from '../App'
import { useState } from 'react'

const Task = ({ title, author, deadline }: TaskType) => {
	const [isChecked, setIsChecked] = useState(false)

	function toggleCheck() {
		setIsChecked(prevState => !prevState)
	}

	return (
		<div onClick={toggleCheck} className='bg-secondary active:bg-primary my-4 p-4 flex justify-between items-center rounded-2xl shadow-md'>
			<div>
				<p>{deadline}</p>
				<p className='text-xl font-bold'>{title}</p>
				<p className='text-slate-600'>{author}</p>
			</div>
			{isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
		</div>
	)
}

export default Task
