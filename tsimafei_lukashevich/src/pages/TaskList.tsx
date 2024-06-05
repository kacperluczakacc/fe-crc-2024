/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { IoMdAdd as AddIcon, IoMdTrash as TrashIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";

import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
import { EndPoint } from "../api/constants";
import { useEffect, useState } from "react";
import { Task as TaskType} from "../App"

export default function TaskList() {
  const [tasks, setState] = useState<TaskType[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [checkedTaskId, setCheckedTaskId] = useState('')

  async function getAllTasks() {
    setIsLoading(true)
    const response = await fetch(EndPoint.TASKS)
    const tasks = await response.json()
    
    if (tasks) { setState(tasks) } 
    else { setError("Something is wrong") }
    setIsLoading(false)
  }

  async function deleteTask(id: string) {
    await fetch(`${EndPoint.TASKS}/${id}`, { method: "DELETE" })
    setCheckedTaskId('')
    getAllTasks()
  }

  useEffect(() => { getAllTasks() }, [])

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to={ROUTE.ADD_TASK}>
          <button className="bg-primary rounded-full px-5 py-4 text-white font-semibold flex items-center gap-2">
            <AddIcon />
            New To-do
          </button>
        </Link>
        <div className="flex gap-4">
          <FilterIcon size={24} />
          {checkedTaskId !== '' && <TrashIcon size={24} onClick={() => deleteTask(checkedTaskId)} />}
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error.length > 0 ? (
        <p>{error}</p>
      ) : (
        tasks.map((task) => (
          <Task
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
  )
}
