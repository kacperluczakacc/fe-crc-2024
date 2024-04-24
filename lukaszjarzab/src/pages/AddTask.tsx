import { useEffect, useRef, useState } from "react";
import { TaskType } from "../App";
import { MdClose as CloseIcon } from "react-icons/md";
import { RegExp } from "../lib/constants";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const AddTask = ({ setTasks }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  // ZAD DOM zrobic walidacje tekstu dla Author
  // zrobic to reuzywalne na wielu wartosciach ( dynamiczne)

  const hideTaskNameError = () => {
    setTaskNameError(false);
  };

  const hideDeadlineError = () => {
    setDeadlineError(false);
  };

  function handleAddTask() {
    if (taskName.length == 0) {
      setTaskNameError(true);
    }
    if (!RegExp.deadline.test(deadline)) {
      setDeadlineError(true);
    }
    // setTasks(prevTasks => [
    //     ...prevTasks,
    //     {
    //         title: taskNameRef.current!.value,
    //         title: authorRef.current!.value,
    //         title: deadlineRef.current!.value
    //     }
    // ]);
  }

  // useEffect(() => {
  //   setTaskNameError(taskName.length === 1);
  //   setDeadlineError(RegExp.deadline.test(deadline));
  // }, [taskName, deadline]);

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
          <label className="absolute -top-3 left-2 bg-secondary">
            Task name
          </label>
          <input
            onInput={(input) => setTaskName(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
            onFocus={hideTaskNameError}
          />
          {taskNameError && <p>Task name is empty. Please add text</p>}
        </div>
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary">
            Task author
          </label>
          <input className="border h-14 p-4" type="text" />
        </div>
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary">
            Task deadline
          </label>
          <input
            onFocus={hideDeadlineError}
            onInput={(input) => setDeadline(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
          />
          {deadlineError && (
            <p>Deadline is in a wrong format (DD/YY/YYYY). Please correct</p>
          )}
        </div>
      </form>
      {/* <button type="button" className="border" onClick={handleAddTask}>
        ADD TASK
      </button>
      <form className="flex flex-col gap-1 my-2">
        <label>Task name</label>
        <input ref={taskNameRef} className="border" type="text" />
        <label>Task author</label>
        <input ref={authorRef} className="border" type="text" />
        <label>Task deadline</label>
        <input ref={deadlineRef} className="border" type="text" />
      </form> */}
    </section>
  );
};

export default AddTask;
