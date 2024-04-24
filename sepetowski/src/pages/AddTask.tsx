import { Task } from '../types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewTask, newTask } from '../schema/newTask';
interface Props {
	onAddTask: (task: Task) => void;
}

export const AddTask = ({ onAddTask }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewTask>({
		defaultValues: {
			date: '',
			author: '',
			taskName: '',
		},
		resolver: zodResolver(newTask),
	});

	const onSubmit: SubmitHandler<NewTask> = (formData) => {
		onAddTask({ author: formData.author, deadline: formData.date, title: formData.taskName });
		reset();
	};

	return (
		<section>
			<div className='flex justify-center items-center p-4'>
				<h1 className='text-xl'>Create new task</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 my-6 px-5'>
				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Task name</label>
					<input className='border h-14 p-4' type='text' {...register('taskName')} />
					{errors.taskName && <p className='text-red-500'>{errors.taskName.message}</p>}
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Author</label>
					<input className='border h-14 p-4' type='text' {...register('author')} />
					{errors.author && <p className='text-red-500'>{errors.author.message}</p>}
				</div>

				<div className='flex flex-col relative'>
					<label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline</label>
					<input className='border h-14 p-4' type='text' {...register('date')} />
					{errors.date && <p className='text-red-500'>{errors.date.message}</p>}
				</div>
				<button className='text-primary font-bold'>Save</button>
			</form>
		</section>
	);
};
