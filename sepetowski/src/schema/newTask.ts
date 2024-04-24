import { z } from 'zod';
import { RegExp } from '../lib/constants';

export const newTask = z.object({
	taskName: z.string().min(2, 'Plase provide your task name').max(50, 'Task name is to long'),
	author: z.string().min(4, 'Plase provide your name').max(20, 'Author name is to long'),
	date: z.string().refine((value) => RegExp.deadline.test(value), {
		message: 'Wrong format of date. The corret one is DD/MM/YYYY',
	}),
});

export type NewTask = z.infer<typeof newTask>;
