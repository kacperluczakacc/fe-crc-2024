import { TaskType } from "../App";
import Task from "./Task";

type TaskListType = {
  tasks: TaskType[];
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
