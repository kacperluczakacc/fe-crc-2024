import { Link } from "react-router-dom";
import { Task as TaskType } from "../App";
import { IoMdAdd as AddIcon} from "react-icons/io";
import { IoFilter as FilterIcon } from "react-icons/io5";
import Task from "../components/Task";
import { ROUTE } from "../lib/constants";

type TaskListType = { tasks: TaskType[] }

export default function TaskList({ tasks }: TaskListType) {
    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Link to={ROUTE.ADD_TASK}>
                    <button className="bg-primary rounded-full px-5 py-4 text-white font-semibold flex items-center gap-2">
                        <AddIcon />
                        New to-do
                    </button>
                </Link>
                <FilterIcon />
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