import { useRef } from 'react';
import { NewTask, Task } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	onAddNewTaskHandler: (task: Task) => void;
}

export const AddTaskForm = ({ onAddNewTaskHandler }: Props) => {
	const formRef = useRef<null | HTMLFormElement>(null);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) return;

		const formData = new FormData(formRef.current);

		const formDataObject: NewTask = {
			title: formData.get('title') as string,
			author: formData.get('author') as string,
			deadline: new Date(formData.get('deadline') as string),
		};

		if (!formDataObject.author.trim() || !formDataObject.title.trim() || !formDataObject.deadline)
			return;

		onAddNewTaskHandler({ ...formDataObject, id: uuidv4() });

		formRef.current.reset();
	};

	return (
		<form
			ref={formRef}
			onSubmit={onSubmit}
			className='p-4 rounded-md border border-white/40 min-w-64 min-h-80 flex flex-col justify-between '>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-1'>
					<label htmlFor='title'>Title</label>
					<input
						className='px-1 rounded-sm text-black'
						type='text'
						placeholder='Title'
						name='title'
						id='title'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<label htmlFor='author'>Author</label>
					<input
						className='px-1 rounded-sm text-black'
						type='author'
						placeholder='Author'
						name='author'
						id='author'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='deadline'>Deadline</label>
					<input
						className='px-1 rounded-sm text-black'
						type='date'
						placeholder='Deadline'
						name='deadline'
						id='deadline'
					/>
				</div>
			</div>
			<button className='w-full px-2 py-1 rounded-md bg-green-500'>Add</button>
		</form>
	);
};
