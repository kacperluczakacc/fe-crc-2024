import { IoFilterSharp as FilterIcon } from "react-icons/io5";
import { IoTrashOutline as TrashIcon } from "react-icons/io5";
import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
import { Link } from "react-router-dom";
import { Endpoint } from "../api/constants";
import { useEffect, useState } from "react";
import { TaskType } from "../App";

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);

    async function getAllTasks() {
        setIsLoading(true);
        try {
            const response = await fetch(Endpoint.TASKS);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = await response.json();
            setTasks(tasks);
            setError('');
        } catch (error) {
            setError('Something went wrong while fetching tasks');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteSelectedTasks() {
        try {
            await Promise.all(
                checkedTaskIds.map(id =>
                    fetch(`${Endpoint.TASKS}/${id}`, { method: "DELETE" })
                )
            );
            setCheckedTaskIds([]);
            getAllTasks();
        } catch (error) {
            setError('Failed to delete tasks');
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary rounded-full px-5 py-4 text-white font-semibold">
                        New To-do
                    </button>
                </Link>
                <div className="flex gap-4">
                    <FilterIcon size={24} />
                    {checkedTaskIds.length > 0 && (
                        <TrashIcon
                            size={24}
                            onClick={deleteSelectedTasks}
                            className="cursor-pointer"
                        />
                    )}
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                tasks.map((task) => (
                    <Task
                        key={task.id}
                        title={task.title}
                        author={task.author}
                        deadline={task.deadline}
                        id={task.id}
                        isSelected={checkedTaskIds.includes(task.id)}
                        setCheckedTaskId={setCheckedTaskIds}
                    />
                ))
            )}
        </section>
    );
}