import { Link } from "react-router-dom";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";
import { IoMdTrash as TrashIcon } from "react-icons/io";

import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
import { Endpoint } from "../api/constants";
import { useEffect, useState } from "react";
import { Task as TaskType } from "../App";

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [checkedTasksId, setCheckedTasksId] = useState<string[]>([])

  function addCheckedTask(id: string) {
    setCheckedTasksId([...checkedTasksId, id])
  }

  function dropCheckedTask(id: string) {
    setCheckedTasksId(checkedTasksId.filter(tid => tid != id))
  }

  function deleteTasks() {
    checkedTasksId.forEach((val) => {
      deleteTask(val).then(() => dropCheckedTask(val))
    })
  }

  async function getAllTasks() {
    setIsLoading(true);

    const response = await fetch(Endpoint.TASKS);
    const tasks = await response.json();

    if (tasks) {
      setIsLoading(false);
      setTasks(tasks);
    } else {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  async function deleteTask(id: string) {
    await fetch(`${Endpoint.TASKS}/${id}`, {
      method: "DELETE",
    });
    getAllTasks();
  }

  useEffect(() => {
    getAllTasks();
  }, []);

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
          <FilterIcon onClick={() => console.log(checkedTasksId)} size={24} />
          {checkedTasksId.length > 0 && (
            <TrashIcon className="cursor-pointer" size={24} onClick={() => deleteTasks()} />
          )}
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
            addCheckedTask={addCheckedTask}
            dropCheckedTask={dropCheckedTask}
          />
        ))
      )}
    </section>
  );
}
