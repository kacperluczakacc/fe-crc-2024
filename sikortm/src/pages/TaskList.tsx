import { MdFilterList as FilterIcon } from "react-icons/md";
import { IoMdAdd as AddIcon, IoMdTrash as TrashIcon } from "react-icons/io";

import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
// import { useTypedSelector } from "../store";
import { Link } from "react-router-dom";
import { Endpoint } from "../api/constants";
import { useEffect, useState } from "react";
import { Task as TaskType } from "../App";
import dayjs from "dayjs";

export default function TaskList() {
    // const tasks = useTypedSelector(state => state.tasks.taskList)

    const [tasks, setState] = useState<TaskType[]>([]);
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkedTasksIds, setCheckedTasksIds] = useState<string[]>([]);
    const [checkedTasksIdsSize, setCheckedTasksIdsSize] = useState<number>(0);
    // Nie wiem z jakiego powodu ale musiałem zastosować kolejnego useState(),
    // ponieważ zmiana checkedTasksIds nie odświeżała mi komponentu, a więc
    // warunek, który sprawdzał wyświetlenie ikony kosza nie spełniał się
    // nawet jeśli tablica nie była pusta, być może tablice nie wywołują
    // odświeżenia komponentu i zawsze są tablicami.

    const modifyCheckedTasks = (id: string) => {
        if (!checkedTasksIds.includes(id))
            checkedTasksIds.push(id);
        else
            checkedTasksIds.splice(checkedTasksIds.indexOf(id), 1);
        setCheckedTasksIds(checkedTasksIds);
        setCheckedTasksIdsSize(checkedTasksIds.length);
    }

    const getAllTasks = async () => {
        setIsLoading(true);
        const response = await fetch(Endpoint.TASKS);
        const tasks = await response.json();

        if (tasks)
            setState(tasks);
        else
            setError('Something went wrong. Please try again.')
        setIsLoading(false);
    }

    const deleteTask = async (ids: string[]) => {
        for (let i = 0; i < ids.length; i++)
            await fetch(`${Endpoint.TASKS}/${ids[i]}`, { method: 'DELETE' });
        setCheckedTasksIds([]);
        getAllTasks();
    }
    
    useEffect(() => { getAllTasks(); }, []);

    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2" type="button">
                        <AddIcon />
                        New To-do
                    </button>
                </Link>
                <div className='flex gap-4'>
                    <FilterIcon className="cursor-pointer" size={24} />
                    {checkedTasksIdsSize > 0 && <TrashIcon onClick={() => deleteTask(checkedTasksIds)} className="cursor-pointer" size={24} />}
                </div>
            </div>
            {isLoading ? <p>Loading...</p> : error.length > 0 ? <p>{error}</p> : tasks.map(task => 
            <Task
                key={task.title.replace(/ /g, '-')}
                title={task.title}
                author={task.author}
                deadline={dayjs(task.deadline)}
                id={task.id}
                modifyCheckedTasks={modifyCheckedTasks}
            />)} 
        </section>
    )
}