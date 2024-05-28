import { Link } from "react-router-dom";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";

import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
import { useTypedSelector } from "../store";

export default function TaskList() {
  const tasks = useTypedSelector(state => state.tasks.taskList);

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Link to={ROUTE.ADD_TASK}>
          <button className="bg-primary rounded-full px-5 py-4 text-white font-semibold flex items-center gap-2">
            <AddIcon />
            New To-do
          </button>
        </Link>
        <FilterIcon size={24} />
      </div>

      {tasks.map((task) => (
        <Task
          key={task.title.replace(/ /g, "-")}
          title={task.title}
          author={task.author}
          deadline={task.deadline}
        />
      ))}
    </section>
  );
}
