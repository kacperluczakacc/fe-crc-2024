import { Task as TaskType } from "../App"
import Task from "./Task"

type TaskListType = {
    tasks: TaskType[]
}

export default function TaskList({ tasks }: TaskListType) {
    return (
        <div>
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    title={task.title}
                    author={task.author}
                    deadline={task.deadline}

                />
            ))}
        </div>
    )
}