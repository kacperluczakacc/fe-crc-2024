export const ROUTE = {
	HOME: '/',
	ADD_TASK: '/add-task',
}

export const RegExp = {
	deadline: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/,
}

export const ERROR_MESSAGES = {
	taskNameRequired: 'Title is required.',
	taskNameShort: 'Title should be at least 3 characters',
	authorRequired: 'Author is required.',
	deadlineRequired: 'Deadline is required.',
}
