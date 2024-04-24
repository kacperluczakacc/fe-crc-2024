import Task from './Task'
import { TaskT } from '../App'

type TaskListT = {
    tasks: TaskT[]
}

export default function TaskList({ tasks }: TaskListT) {
    return (
        <>
            <div>
                {tasks.map(task => (
                    <Task key={task.title.replace(/ /g, '-')} title={task.title} author={task.author} deadline={task.deadline} />
                ))}
            </div>
        </>
    )
}
