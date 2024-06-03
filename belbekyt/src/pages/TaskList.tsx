import { Link } from 'react-router-dom';
import Task from "../components/Task";
import { ROUTE } from "../lib/constants";

import { IoMdAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { IoMdTrash as TrashIcon } from 'react-icons/io';


import { Endpoint } from "../api/constants";
import { useEffect, useState } from "react";
import { TaskType } from '../App';

export default function TaskList() {
    const [tasks, setState] = useState<TaskType[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checkedTaskId, setCheckedTaskId] = useState('');

    async function getAllTasks(){
        setIsLoading(true);

        const response = await fetch(Endpoint.TASKS);
        const tasks = await response.json();

        if(tasks) {
            setIsLoading(false);
            setState(tasks);
        }
        else{
            setIsLoading(false);    
            setError('Something went wrong. Please try again.');
        }
    }

    async function deleteTask(id: string){
        await fetch(`${Endpoint.TASKS}/${id}`, {
            method: "DELETE"
        });
        setCheckedTaskId('');
        getAllTasks();
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <section className="px-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2 mt-4">
                        <IoMdAdd/>
                        New To-do
                    </button>
                </Link>

                <div className="flex gap-4">
                    <MdFilterList size={24}/>
                    {checkedTaskId !== '' &&  <TrashIcon size={24} onClick={() => deleteTask(checkedTaskId)} />}
                </div>
            </div>            

            {isLoading ? (
                <p>Loading...</p>
            ) : error.length > 0 ? (
                <p>Error...</p>
            ) : (
            tasks.map((task) => 
                <Task 
                    key={task.title.replace(/ /g, '-')}
                    title={task.title}
                    author={task.author}
                    deadline={task.deadline}
                    id={task.id}
                    setCheckedTaskId={setCheckedTaskId}
                />)
            )}
        </section>
    )
}