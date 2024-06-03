export const ROUTE = {
    HOME: '/',
    ADD_TASK: '/add-tasks'
}

export const RegExp = {
    deadline: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/
}

export const AddTaskError = {
    TASK_NAME: 
        "Task name is empty or is less than 3 characters. Pleas add sufficient amount of characters.",
    AUTHOR: 
        "Author is empty or is less than 3 characters. Pleas add sufficient amount of characters.",
    DEADLINE: 
        "Deadline is not set. Please click the date buttons or set the date from the date picker."
}