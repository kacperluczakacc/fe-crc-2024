import { MdFilterList as FilterIcon } from "react-icons/md";
import { IoMdAdd as AddIcon } from "react-icons/io";

import Task from "../components/Task";
import { ROUTE } from "../lib/constans";
import { useTypedSelector } from "../store";
import { Link } from "react-router-dom";

export default function TaskList() {
    const tasks = useTypedSelector(state => state.tasks.taskList)

    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2" type="button">
                        <AddIcon />
                        New To-do
                    </button>
                </Link>
                <FilterIcon className="cursor-pointer" size={24} />
            </div>
            {tasks.map(task => 
            <Task
            key={task.title.replace(/ /g, '-')}
            title={task.title}
            author={task.author}
            deadline={task.deadline}
            />)} 
        </section>
    )
}