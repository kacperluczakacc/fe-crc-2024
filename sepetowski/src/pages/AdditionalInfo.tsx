import { Task } from "../App";

export default function AdditionalInfo({ tasks }: { tasks: Task[] }) {
    return (
        <p>Overall you have: {tasks.length} tasks</p>
    )
}