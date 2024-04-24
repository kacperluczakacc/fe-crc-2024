import { TaskType } from "../App"
import { Link } from 'react-router-dom'
import Task from "../components/Task"
import { ROUTE } from "../lib/constants"

import { IoMdAdd } from "react-icons/io"
import { MdFilterList } from "react-icons/md"

type TaskListType = {
    tasks: TaskType[]
}

export default function TaskList({ tasks }: TaskListType) {
    return (
        <section className="px-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2 mt-4">
                        <IoMdAdd/>
                        New To-do
                    </button>
                </Link>
                <MdFilterList size={24}/>
            </div>
            

            {tasks.map((task) => 
                <Task 
                    key={task.title.replace(/ /g, '-')}
                    title={task.title}
                    author={task.author}
                    deadline={task.deadline}
                />)
            }
        </section>
    )
}