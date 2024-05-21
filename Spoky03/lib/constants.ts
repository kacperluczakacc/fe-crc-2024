export const ROUTE = {
    ADD_TASK: '/add-task',
    HOME : "/",
}

export const RegExp = {
    deadline: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/

}

export const errorsContent = {
    taskNameLength: 'Minimum 3 characters please',
    taskAuthorLength: 'Minimum 3 characters please',
    invalidDeadline: 'Deadline should be of DD/MM/YYYY format',

    requiredField: 'is required'
}