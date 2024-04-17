import { TaskType } from "../App";
import Task from "./Task";

type TaskListType = { tasks: TaskType[] }

export default function TaskList({ tasks }: TaskListType) {
    return (
        <div>
            {tasks.map(task => 
            <Task
                key={task.title.replace(/ /g, '-')}
                title={task.title}
                author={task.author}
                deadline={task.deadline}
            />)}
        </div>
    )
}