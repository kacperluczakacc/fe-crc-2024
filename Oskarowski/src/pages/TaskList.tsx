import { IoMdTrash as TrashIcon } from "react-icons/io";
import { TaskType } from "../types/Task.ts";
import TaskComponent from "../components/Task.tsx";
import { Link } from "react-router-dom";
import { ROUTE } from "../lib/routes.ts";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { IoFilter as FilterIcon } from "react-icons/io5";
import { Endpoint } from "../api/constants.ts";
import { useEffect, useState } from "react";

export default function TaskList() {
    const [tasks, setState] = useState<TaskType[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [checkedTaskId, setCheckedTaskId] = useState("");

    async function getAllTasks() {
        setIsLoading(true);

        const response = await fetch(Endpoint.TASKS);
        const tasks = await response.json();

        if (tasks) {
            setIsLoading(false);
            setState(tasks);
        } else {
            setIsLoading(false);
            setError("Something went wrong. Please try again.");
        }
    }

    async function deleteTask(id: string) {
        await fetch(`${Endpoint.TASKS}/${id}`, {
            method: "DELETE",
        });
        setCheckedTaskId("");
        getAllTasks();
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <section id="tasks-container" className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="flex items-center px-5 py-3 font-semibold text-white rounded-full bg-primary">
                        <AddIcon />
                        New To-Do
                    </button>
                </Link>
                <div className="flex gap-4">
                    <FilterIcon size={24} />
                    {checkedTaskId !== "" && (
                        <TrashIcon
                            size={24}
                            onClick={() => deleteTask(checkedTaskId)}
                        />
                    )}
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error.length > 0 ? (
                <p>{error}</p>
            ) : (
                tasks.map((task) => (
                    <TaskComponent
                        key={task.title.replace(/ /g, "-")}
                        title={task.title}
                        author={task.author}
                        deadline={task.deadline}
                        id={task.id}
                        setCheckedTaskId={setCheckedTaskId}
                    />
                ))
            )}
        </section>
    );
}
