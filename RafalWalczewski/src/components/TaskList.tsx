import {Task as TaskType} from "../App"
import Task from "./Task"

export default function TaskList(){
    return(
        <div>
            {tasks.map((task)=>
            <Task
            key={task.title.replace(/ /g, '-')}
            title={task.title}
            author={task.author}
            deadline={task.deadline}
            
            />)}


        </div>
    )
};