import { TaskType } from "../types/Task.ts";
import TaskComponent from "../components/Task.tsx";
import { Link } from "react-router-dom";
import { ROUTE } from "../lib/routes.ts";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { IoFilter as FilterIcon } from "react-icons/io5";


export default function TaskList({ tasks }: { tasks: TaskType[] }) {
    return (
        <section
            id="tasks-container"
            className="p-4"
        >
            <div className="flex items-center justify-between mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="flex items-center px-5 py-3 font-semibold text-white rounded-full bg-primary">
                        <AddIcon />
                        New To-Do
                    </button>
                </Link>
                <FilterIcon size={24} />
            </div>
            {tasks.map((task) => (
                <TaskComponent
                    key={`${task.title.replace(/ /g, "-")}-${Math.floor(
                        Math.random() * 10000
                    )}`}
                    {...task}
                />
            ))}
        </section>
    );
}
