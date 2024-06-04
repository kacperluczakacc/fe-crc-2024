import { Task as TaskType } from "../App";
import { Header } from "./Header.tsx";
import Task from "./Task.tsx";

type TaskListType = {
  tasks: TaskType[];
};

export default function TaskList({ tasks }: TaskListType) {
  return (
    <>
      <Header></Header>
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
    </>
  );
}
