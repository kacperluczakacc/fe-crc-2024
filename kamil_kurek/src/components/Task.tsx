import {TaskType as TaskType} from "../App.tsx";

export function Task({ title, author, deadline }: TaskType) {
    return (
        <div>
            <p className="text-xl">{title}</p>
            <p className="font-medium">{author}</p>
            <p>{deadline}</p>
        </div>
    )
}
