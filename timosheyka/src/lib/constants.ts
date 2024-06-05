export const ROUTE = {
    HOME: "/",
    ADD_TASK: "/add-tasks",
}

export const ErrorMessage = {
    taskName: ['Task name should be at least 3 characters', 'Task name is required'],
    author: ['Author name should be at least 3 characters', 'Author is required'],
    deadline: ['Deadline should be of DD/MM/YYYY format', 'Deadline is required']
}
  
export const RegExp = {
    deadline: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/
}

export const AddTaskError = {
    TASK_NAME: 'Task name should be at least 3 characters',
    AUTHOR: 'Author name should be at least 3 characters',
    DEADLINE: 'Deadline is null or does not meet DD/MM/YYYY format'
}