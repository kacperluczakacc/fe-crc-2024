import { TaskType } from "../types/Task.ts";

function Task({ title, author, deadline }: TaskType) {
    return (
        <div className="m-4">
            <p className="font-medium">{title}</p>
            <p>{author}</p>
            <p>{deadline}</p>
        </div>
    );
}

export default Task;
