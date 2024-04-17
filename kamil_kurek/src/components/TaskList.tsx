
import {Task} from "./Task.tsx";
import {TaskType} from "../App.tsx";

type TaskListType = {
    tasks: TaskType[],
};

const TaskList = ({ tasks }: TaskListType) => {
    return (
        <div>
            {tasks.map((task) => (
                <Task
                    key={task.title.replace(/ /g, "-")}
                    title={task.title}
                    author={task.author}
                    deadline={task.deadline}
                />
            ))}
        </div>
    );
};

export default TaskList;
