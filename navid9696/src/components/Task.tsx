import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { FaRegSquareCheck } from 'react-icons/fa6'
import { useState } from 'react'
import { Dayjs } from 'dayjs'

type TaskProps = {
	title: string
	author: string
	deadline: string | undefined
	id: string
	setCheckedTaskId: React.Dispatch<React.SetStateAction<string[]>>
}

const Task = ({ title, author, deadline, id, setCheckedTaskId }: TaskProps) => {
	const [isChecked, setIsChecked] = useState(false)

	const toggleCheck = () => {
		setCheckedTaskId(prevValue => {
			if (prevValue.includes(id)) {
				// Remove id from array
				return prevValue.filter(taskId => taskId !== id)
			} else {
				// Add id to array
				return [...prevValue, id]
			}
		})
		setIsChecked(prevState => !prevState)
	}

	const formatDeadline = (deadline: Dayjs | string): string => {
		return typeof deadline === 'string' ? deadline : deadline.format('YYYY-MM-DD')
	}

	return (
		<div
			onClick={toggleCheck}
			className='bg-secondary transition-colors active:bg-primary rounded-xl my-4 p-4 flex justify-between items-center shadow-md'>
			<div>
				<p className=''>{formatDeadline(deadline!)}</p>
				<p className='text-xl font-bold'>{title}</p>
				<p className='text-slate-600'>{author}</p>
			</div>
			{isChecked ? <FaRegSquareCheck size={24} /> : <MdCheckBoxOutlineBlank size={24} />}
		</div>
	)
}

export default Task
