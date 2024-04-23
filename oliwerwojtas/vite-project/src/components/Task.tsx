import { Task as TaskType } from "../App";

function Task({ title, author, deadline }: TaskType) {
  return (
    <div>
      <p className="text-xl">{title}</p>
      <p className="text-base">{author}</p>
      <p className="text-md">{deadline}</p>
    </div>
  );
}
export default Task;
