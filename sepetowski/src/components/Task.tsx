import {
	MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
	MdOutlineCheckBox as CheckedCheckbox,
} from 'react-icons/md';
import { Task as ITask } from '../types/types';
import { useState } from 'react';

interface Props extends ITask {}

export const Task = ({ title, author, deadline }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	function toggleCheck() {
		setIsChecked((prevState) => !prevState);
	}

	return (
		<div
			onClick={toggleCheck}
			className='bg-secondary rounded-2xl shadow-md  my-4 p-4 flex justify-between items-center'>
			<div>
				<p>{deadline}</p>
				<p className='text-xl font-bold'>{title}</p>
				<p className='text-slate-600'>{author}</p>
			</div>
			{isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
		</div>
	);
};
