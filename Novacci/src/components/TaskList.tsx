import Task from './Task';
import {Task as TaskType} from "../App";


type TaskListType = {
    tasks: TaskType[]
}




export default function TaskList({tasks}:TaskListType) {
    return (
        <>
        {tasks.map((task) =>
             <Task key={task.title.replace(/ /g,'-')} title={task.title} author={task.author} deadline={task.deadline}/>)}
        </>
    )
}