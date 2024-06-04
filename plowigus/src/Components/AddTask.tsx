import { useRef, useState } from "react";
import { Task } from "../App";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function AddTask({ setTasks }: AddTaskProps) {
  // taskNameRef to obiekt, ktory ma strukture nastepujaca:
  // taskNameRef: { current }
  /* const [taskName, setTaskName] = useState(''); */
  const taskNameRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  function handleAddTask() {
    if (taskNameRef.current && authorRef.current && deadlineRef.current) {
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

  console.log("I (re-)rendered!");

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
          /* onChange={(inputVal) => setTaskName(inputVal.currentTarget.value)} */ ref={
            taskNameRef
          }
          className="border"
          type="text"
        />
        <label>Author:</label>
        <input ref={authorRef} className="border" type="text" />
        <label>Deadline:</label>
        <input ref={deadlineRef} className="border" type="text" />
      </form>
    </div>
  );
}
