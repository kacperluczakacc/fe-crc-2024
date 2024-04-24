import {Task as TaskType} from "../App.tsx";
function Task({title, author, deadline}:TaskType) {
    return(
        <div>
            <p>{title}</p>
            <p>{author}</p>
            <p>{deadline}</p>
        </div>
    )

}
export default Task;