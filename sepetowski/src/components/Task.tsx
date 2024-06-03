import {
	MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
	MdOutlineCheckBox as CheckedCheckbox,
} from 'react-icons/md';

interface Props {
	id: string;
	title: string;
	author: string;
	deadline: string;
	isChecked: boolean;
	toggleTaskChecked: (id: string) => void;
}

export const Task = ({ id, title, author, deadline, isChecked, toggleTaskChecked }: Props) => {
	return (
		<div
			onClick={() => toggleTaskChecked(id)}
			className='bg-secondary rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center'>
			<div>
				<p>{deadline}</p>
				<p className='text-xl font-bold'>{title}</p>
				<p className='text-slate-600'>{author}</p>
			</div>
			{isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
		</div>
	);
};
