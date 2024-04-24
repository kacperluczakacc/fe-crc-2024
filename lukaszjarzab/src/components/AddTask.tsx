import { useRef } from "react";
import { TaskType } from "../App";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const AddTask = ({ setTasks }: AddTaskProps) => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: taskNameRef.current!.value,
        author: authorRef.current!.value,
        deadline: deadlineRef.current!.value,
      },
    ]);
  };

  return (
    <div>
      <button type="button" className="border" onClick={handleAddTask}>
        ADD TASK
      </button>
      <form className="flex flex-col gap-1 my-2">
        <label>Task name</label>
        <input ref={taskNameRef} className="border" type="text" />
        <label>Task author</label>
        <input ref={authorRef} className="border" type="text" />
        <label>Task deadline</label>
        <input ref={deadlineRef} className="border" type="text" />
      </form>
    </div>
  );
};

export default AddTask;
