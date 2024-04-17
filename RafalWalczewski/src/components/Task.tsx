import { Task as TaskType } from "../App"

function Task({title, author, deadline}: TaskType){
    return(
        <div className="p-8">
            <p className = "text-xl">{title}</p>
            <p className = "font-medium">{author}</p>
            <p>{deadline}</p>
        </div>
    )
}
export default Task