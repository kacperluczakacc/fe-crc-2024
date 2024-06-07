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
  const [tasks, setState] = useState<TaskType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskIds, setTaskIds] = useState<string[] | null>(null) ;
  async function getAllTasks() {
    setIsLoading(true);

    const response = await fetch(Endpoint.TASKS);
    const tasks = await response.json();

    if (tasks) {
      setIsLoading(false);
      setState(tasks);
    } else {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  async function deleteTask() {
    if (taskIds && taskIds.length > 0) {
      const deletePromises = taskIds.map(id =>
          fetch(`${Endpoint.TASKS}/${id}`, { method: "DELETE" })
      );
      await Promise.all(deletePromises);
      setTaskIds(null);
      getAllTasks();
    }
  }


  const toggleTaskCheck = (id: string) => {
    if (taskIds?.includes(id)) {
      const newArray = taskIds.filter(el => el !== id);
      setTaskIds(newArray);
    } else {
      setTaskIds(prev => prev ? [...prev, id] : [id]);
    }
  };


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
          <FilterIcon size={24} />
          {taskIds?.length &&(
            <TrashIcon size={24} onClick={() => deleteTask()} />
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
            id={task.id}
              key={task.title.replace(/ /g, "-")}
            title={task.title}
            author={task.author}

            deadline={task.deadline}
            setCheckedTaskId={() => toggleTaskCheck(task.id)}
            isChecked={taskIds?.includes(task.id)}
          />
        ))
      )}
    </section>
  );
}
