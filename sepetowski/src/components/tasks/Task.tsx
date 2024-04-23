import { Task as ITask } from '../../types/types';

interface Props {
	task: ITask;
}

export const Task = ({ task: { author, deadline, title } }: Props) => {
	return (
		<div className='p-4 rounded-md border border-white/40 min-w-64 min-h-80 flex flex-col justify-between '>
			<div>
				<h2 className='text-2xl'>{title}</h2>
				<p className='text-lg'>
					author: <span className='text-green-500 font-semibold'>{author}</span>
				</p>
			</div>
			<p className='text-sm text-white/40'>{deadline.toLocaleDateString()}</p>
		</div>
	);
};
