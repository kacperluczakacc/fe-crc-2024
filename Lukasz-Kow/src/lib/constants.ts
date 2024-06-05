export const ROUTE = {
    HOME: "/",
    ADD_TASKS: "/add-tasks"

};

export const RegExp = {
    DEADLINE: /^^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/

}

export const AddTaskError = {
    TASK_NAME: "Task name is empty or is less then 3 characters. Pleas add sufficiet number of characters!",
    AUTHOR: "Author is empty or is less then 3 characters. Pleas add sufficiet number of characters!",
    DEADLINE: "Deadline is empty or is less then 3 characters. Pleas add sufficiet number of characters!"
}