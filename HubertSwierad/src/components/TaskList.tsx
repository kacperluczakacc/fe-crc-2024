import {Task as TaskType} from "../App.tsx";
import Task from "./Task.tsx"

type TaskListType = {
    tasks: TaskType[]
}

export default function TaskList({tasks}:TaskListType){
    return(
        <div>
            {tasks.map(task =>
                <Task
                    key={task.title}
                    title={task.title}
                    author={task.author}
                    deadline={task.deadline}
                />)}
        </div>
    )
}