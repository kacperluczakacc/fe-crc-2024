import { Task as TaskType } from "../App";
import Task from "./Task";
type TaskListProps = {
  tasks: TaskType[];
};
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.title} author={task.author} deadline={task.deadline} title={task.title} />
      ))}
    </div>
  );
}
