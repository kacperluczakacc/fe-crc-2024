import { useEffect, useRef, useState } from "react";
import { TaskType } from "../App";
import { MdClose as CloseIcon } from "react-icons/md";
import { ROUTE, RegExp } from "../lib/constants";
import { Link } from "react-router-dom";

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const AddTask = ({ setTasks }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskAuthor, setTaskAuthor] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [taskAuthorError, setTaskAuthorError] = useState(false);

  // ZAD DOM zrobic walidacje tekstu dla Author
  // zrobic to reuzywalne na wielu wartosciach ( dynamiczne)

  const hideTaskNameError = () => {
    setTaskNameError(false);
  };

  const hideDeadlineError = () => {
    setDeadlineError(false);
  };

  const hideTaskAuthorError = () => {
    setTaskAuthorError(false);
  };

  function handleAddTask() {
    if (taskName.length == 0) {
      setTaskNameError(true);
    }
    if (!RegExp.deadline.test(deadline)) {
      setDeadlineError(true);
    }
    if (taskAuthor.length == 0) {
      setTaskAuthorError(true);
    }

    if (
      taskName.length > 0 &&
      RegExp.deadline.test(deadline) &&
      taskAuthor.length > 0
    ) {
      console.log("CREATED");
      setTasks((prevTasks) => {
        console.log([
          ...prevTasks,
          { title: taskName, author: taskAuthor, deadline: deadline },
        ]);
        return [
          ...prevTasks,
          { title: taskName, author: taskAuthor, deadline: deadline },
        ];
      });
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
        <Link to={ROUTE.HOME}>
          <CloseIcon size={24} />
        </Link>
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
          <input
            onInput={(input) => setTaskAuthor(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
            onFocus={hideTaskAuthorError}
          />
          {taskAuthorError && <p>Author field is empty. Please add text</p>}
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
            <p>Deadline is in a wrong format (DD/MM/YYYY). Please correct</p>
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
