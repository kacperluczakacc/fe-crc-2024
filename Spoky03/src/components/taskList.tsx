import { Task } from "./task";
import { Task as TaskType } from "../App";

type TaskListType = {
    tasks: TaskType[]
}
export const TaskList = ({tasks}:TaskListType) => {
    return (
        <>
        {tasks.map((task, index) => (
            <Task key={index} 
              title={task.title} 
              author={task.author} 
              deadline={task.deadline} 
            />
          ))}
        </>
    )
}