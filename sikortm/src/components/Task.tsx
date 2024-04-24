import { Task as TaskType } from "../App"

export default function Task({title, author, deadline}: TaskType){
    return(
        <div>
            <p className="text-xl">{title}</p>
            <p className="font-medium">{author}</p>
            <p>{deadline}</p>
        </div>
    )
}