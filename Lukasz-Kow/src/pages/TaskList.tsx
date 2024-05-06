import { Link } from "react-router-dom"
import { Task as TaskType } from "../App"
import Task from "../components/Task"
import { ROUTE } from '../lib/constants';
import { IoIosAdd as AddIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";

type TaskListType = {
    tasks: TaskType[]
}

export default function TaskList({ tasks }: TaskListType) {
    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASKS}>
                    <button className="bg-primary rounded-full px-5 py-4 text-white font-semibold flex items-center gap-2">
                        <AddIcon />
                        New To-Do
                    </button>
                </Link>
                <FilterIcon size={24} />
            </div>

            {
                tasks.map((task, index) => (
                    <Task
                        key={index}
                        title={task.title}
                        author={task.author}
                        deadline={task.deadline}

                    />
                ))
            }
        </section >
    )
}