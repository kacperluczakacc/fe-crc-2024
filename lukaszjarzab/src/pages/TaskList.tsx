import { Link } from "react-router-dom";
import { ROUTE } from "../lib/constants";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";
import { Endpoint } from "../api/constants";
import { useEffect, useState } from "react";
import { TaskType } from "../App";
import { IoMdTrash as TrashIcon } from "react-icons/io";
import { Task } from "../components";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);

  async function getAllTasks() {
    setIsLoading(true);

    const response = await fetch(Endpoint.TASKS);
    const tasks = await response.json();

    if (tasks) {
      setIsLoading(false);
      setTasks(tasks);
    } else {
      setIsLoading(false);
      setError("Something went wrong");
    }
  }

  async function deleteTask(ids: string[]) {
    ids.forEach(async (id) => {
      await fetch(`${Endpoint.TASKS}/${id}`, {
        method: "DELETE",
      });
      setCheckedTaskIds([]);
      getAllTasks();
    });
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <section className="p-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <Link to={ROUTE.ADD_TASK}>
          <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center">
            <AddIcon />
            New To-do
          </button>
        </Link>
        <div className="flex gap-4">
          <FilterIcon size={24} />
          {checkedTaskIds.length !== 0 && (
            <TrashIcon size={24} onClick={() => deleteTask(checkedTaskIds)} />
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
            setCheckedTaskIds={setCheckedTaskIds}
          />
        ))
      )}
    </section>
  );
};
export default TaskList;
