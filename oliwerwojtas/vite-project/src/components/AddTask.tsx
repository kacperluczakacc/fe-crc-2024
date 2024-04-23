import { useRef } from "react";
import { Task } from "../App";
type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function AddTask({ setTasks }: AddTaskProps) {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  function handleAddTask() {
    if (taskNameRef.current) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          title: taskNameRef.current!.value,
          author: authorRef.current!.value,
          deadline: deadlineRef.current!.value,
        },
      ]);
    }
  }
  return (
    <div>
      <button onClick={handleAddTask} type="button" className="border border-solid">
        Add TASK
      </button>
      <form className="flex flex-col">
        <label>Task name:</label>
        <input ref={taskNameRef} className="border" type="text" />
        <label>Author:</label>
        <input ref={authorRef} className="border" type="text" />
        <label>Deadline:</label>
        <input ref={deadlineRef} className="border" type="text" />
      </form>
    </div>
  );
}
