import { Task } from "./task";
import { Task as TaskType } from "../App";
import { Link } from "react-router-dom";
import { IoMdAdd as AddIcon } from 'react-icons/io'
import { MdFilterList as FilterIcon } from 'react-icons/md'

type TaskListType = {
    tasks: TaskType[]
}
export const TaskList = ({tasks}:TaskListType) => {
    return (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
          <Link to="/add-task">

            <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full">
            <AddIcon className="inline-block" size={24} />
              <span className="ml-2">New To-do</span>
            </button>
          </Link>
          <FilterIcon size={24} />
        </div>
        {tasks.map((task, index) => (
            <Task key={index} 
              title={task.title} 
              author={task.author} 
              deadline={task.deadline} 
            />
          ))}
        </div>
    )
}