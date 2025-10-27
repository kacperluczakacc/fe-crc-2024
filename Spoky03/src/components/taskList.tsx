import { Task } from "./task";
import { Link } from "react-router-dom";
import { IoMdAdd as AddIcon } from 'react-icons/io'
import { IoMdTrash as DelIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from 'react-icons/md'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../reducers/taskReducer";
import { useState } from "react";
import dayjs from "dayjs";
import { useNotifyDispatch } from './notifyContext'


export const TaskList = () => {
    const notifyDispatch = useNotifyDispatch()
    const [filter, setFilter] = useState<boolean>(false)
    const tasks = useSelector((state:RootState) => state.tasks)
    const tasksToDelete = useSelector((state:RootState) => state.tasksToDelete)
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = () => {
        const numberOfDeletedTasks = tasksToDelete.reduce((acc, id) => {
            dispatch(deleteTask(id))
            return acc + 1
        },0)
        notifyDispatch({ type: 'SET', payload: numberOfDeletedTasks>1?`Deleted ${numberOfDeletedTasks} tasks`: 'Deleted 1 task'})
    }
    const tasksFiltered = filter ? tasks.filter(task => dayjs(task.deadline).isBefore(dayjs())) : tasks
    return (
        <div className="p-4">
            <h1 className='text-2xl p-3 pb-5'>Hi, got a new thing to add?</h1>
          <div className="flex justify-between items-center mb-4">
          <Link to="/add-task">
            
            <button className="bg-primary px-5 py-3 text-white font-semibold rounded-full">
            <AddIcon className="inline-block" size={24} />
              <span className="ml-2">New To-do</span>
            </button>
          </Link>
          <div className="flex flex-row gap-5 mr-4">
            <button className="" onClick={handleDelete}>
              <DelIcon className="inline-block" size={24} />
            </button>
            <button onClick={() => setFilter(!filter)}>
              <FilterIcon size={24} />
            </button>
          </div>
        </div>
        {tasksFiltered.map(task => (
            <Task key={task.id} 
              title={task.title} 
              author={task.author} 
              deadline={task.deadline}
              id={task.id}
            />
          ))}
        </div>
    )
}