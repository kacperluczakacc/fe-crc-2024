import { TaskType } from "../types/Task.ts";
import TaskComponent from "./Task.tsx";

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
    return (
        <div
            id="tasks-container"
            className="flex justify-center items-center flex-col"
        >
            {tasks.map((task) => (
                <TaskComponent key={`${task.title.replace(/ /g, "-")}-${Math.floor(Math.random() * 10000)}`} {...task} />
            ))}
        </div>
    );
}
