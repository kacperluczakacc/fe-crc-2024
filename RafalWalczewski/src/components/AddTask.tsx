import { useRef, useState } from "react";
import { Task } from "../App";

type AddTasksProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function AddTask({ setTasks }: AddTasksProps) {
  //taskNameRef to obiekt, ktory ma strukturę następującą:
  // taskNameRef: {current}
  const taskNameRef = useRef<HTMLInputElement>(null);
  const taskAuthorRef = useRef<HTMLInputElement>(null);
  const taskDeadlineRef = useRef<HTMLInputElement>(null);
  // const [taskName, setTaskName] = useState("");

  function handleAddTask() {
    if (
      taskNameRef.current &&
      taskAuthorRef.current &&
      taskDeadlineRef.current
    ) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          title: taskNameRef.current!.value,
          author: taskAuthorRef.current!.value,
          deadline: taskDeadlineRef.current!.value,
        },
      ]);
    }
  }

  return (
    <div>
      <button
        onClick={handleAddTask}
        type="button"
        className="border border-solid"
      >
        ADD TASK
      </button>
      <form className="flex flex-col gap-1 my-2">
        <label>Task name:</label>
        <input
          ref={taskNameRef}
          // onInput={(inputValue) => setTaskName(inputValue.currentTarget.value)}
          className="border"
          type="text"
        ></input>
        <label>Author:</label>
        <input ref={taskAuthorRef} className="border" type="text"></input>
        <label>Deadline:</label>
        <input ref={taskDeadlineRef} className="border" type="text"></input>
      </form>
    </div>
  );
}
