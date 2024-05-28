import { Link } from "react-router-dom";
import Task from "../components/Task";
import { ROUTE } from "../lib/constants";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdFilterList as FilterIcon } from "react-icons/md";
import { useTypedSelector } from "../store";

const TaskList = () => {
  const tasks = useTypedSelector((state) => state.tasks.tasks);

  return (
    <section className="p-4">
      <div className="flex flex-row justify-between items-center mb-4">
        <Link to={ROUTE.ADD_TASK}>
          <button className="bg-primary px-5 py-4 text-white font-semibold rounded-full flex items-center">
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
};
export default TaskList;
