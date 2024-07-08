import { useEffect, useRef, useState } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { Task } from "../App";
import { RegExp } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function AddTask({ setTasks }: AddTaskProps) {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [author, setAuthor] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  // ZAD. DOMOWE -> zrobić walidację tekstu dla Author

  function hideTaskError() {
    setTaskNameError(false);
  }

  function hideDeadlineError() {
    setDeadlineError(false);
  }

  function hideAuthorError() {
    setAuthorError(false);
  }

  useEffect(() => {
    setTaskNameError(taskName.length === 1);
    setAuthorError(author.length === 1);
    // setAuthorError(author[0] !== author[0].toUpperCase());
    setDeadlineError(RegExp.deadline.test(deadline));
  }, [taskName, deadline, author]);

  function handleAddTask() {
    /*       setTasks((prevTasks) => [
        ...prevTasks,
        {
          title: taskNameRef.current!.value,
          author: authorRef.current!.value,
          deadline: deadlineRef.current!.value,
        },
      ]); */

    async function handleSaveClick() {
      if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
        const response = await addNewTaskToServer();
      
        if (response.ok){
          
        }} 
    };

    async function addNewTaskToServer() {
      const response = await fetch(Endpoint.TASKS, {
        method: "POST",
        body: JSON.stringify({
          title: taskName,
          author,
          deadline: deadline?.toString()
        })
      });
      return response;
  }

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <CloseIcon size={24} />
        <h1 className="text-xl">Create new task</h1>
        <button onClick={handleAddTask} className="text-primary font-bold">
          Save
        </button>
      </div>
      <form className="flex flex-col gap-10 my-6 px-5">
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Task name
          </label>
          <input
            onFocus={hideTaskError}
            onInput={(input) => setTaskName(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
          />
          {taskNameError && (
            <p className="text-red-600">Task name is empty. Please add text.</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Author
          </label>
          <input
            onFocus={hideAuthorError}
            onInput={(input) => setAuthor(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
          />
          {authorError && (
            <p className="text-red-600">
              Author name must be at least 2 letters long and start with a
              capital letter. Please add text.
            </p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Deadline
          </label>
          <input
            onFocus={hideDeadlineError}
            onInput={(input) => setDeadline(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
          />
          {deadlineError && (
            <p>Deadline is in a wrong format (DD/MM/YYYY). Please correct.</p>
          )}
        </div>
        <div>
          <button>Today</button>
          <button>Tomorrow</button>
        </div>
        <p>select your date</p>
        <DatePicker format="DD/MM/YYYY" />
      </form>
    </section>
  );
}

{
  /* <button
onClick={handleAddTask}
type="button" className="border border-solid">
ADD TASK
</button>
<form className="flex flex-col gap-1 my-2">
<label>Task name:</label>
<input ref={taskNameRef}
    className="border" type="text" />
<label>Author:</label>
<input ref={authorRef} className="border" type="text" />
<label>Deadline:</label>
<input ref={deadlineRef} className="border" type="text" />
</form> */
}
