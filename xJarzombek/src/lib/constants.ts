export const ROUTE = {
    HOME: "/",
    ADD_TASK: "/add-task",
};

export const RegExp = {
    deadline: /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/
};

export const AddTaskError = {
    TASK_NAME: "Task name is empty",
    AUTHOR: "Author is empty",
    DEADLINE: "Deadline is not set."
}