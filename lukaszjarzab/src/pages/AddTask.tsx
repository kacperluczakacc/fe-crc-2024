import { useEffect, useRef, useState } from "react";
import { TaskType } from "../App";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE, RegExp } from "../lib/constants";
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTypedDispatch } from "../store";
import { addTask } from "../store/features/task/taskSlice";

enum CustomDate {
  TODAY,
  TOMORROW,
}

const AddTask = () => {
  const history = useHistory();
  const updateStore = useTypedDispatch();
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(
    null
  );
  const [taskAuthor, setTaskAuthor] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [taskAuthorError, setTaskAuthorError] = useState(false);

  const isTaskNameValid = taskName?.length >= 3;
  const isAuthorValid = taskAuthor?.length >= 3;
  const isDeadlineValid = deadline !== null;

  function setErrors() {
    setTaskNameError(!isTaskNameValid);
    setTaskAuthorError(!isAuthorValid);
    setDeadlineError(!isDeadlineValid);
  }

  useEffect(() => {
    setTaskNameError(taskName.length > 0 && !isTaskNameValid);
    setTaskAuthorError(taskAuthor.length > 0 && !isAuthorValid);
  }, [taskName, taskAuthor]);

  useEffect(() => {
    if (customButtonDate === null) {
      setDeadline(null);
    } else {
      setDeadline(
        customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day")
      );
      setDeadlineError(false);
    }
  }, [customButtonDate]);

  const hideTaskNameError = () => {
    setTaskNameError(false);
  };

  const hideTaskAuthorError = () => {
    setTaskAuthorError(false);
  };

  function handleCustomButtonClick(date: CustomDate) {
    setCustomButtonDate((prev) => (prev === date ? null : date));
  }

  function handleAddTask() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      updateStore(
        addTask({
          title: taskName,
          author: taskAuthor,
          deadline: deadline,
        })
      );
      history.push(ROUTE.HOME);
    } else {
      setErrors();
    }
  }

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
          {taskNameError && (
            <p className="text-red-500">{AddTaskError.TASK_NAME}</p>
          )}
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
          {taskAuthorError && (
            <p className="text-red-500">{AddTaskError.AUTHOR}</p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
            className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
              customButtonDate === CustomDate.TODAY
                ? "bg-primary text-white"
                : ""
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)}
            className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
              customButtonDate === CustomDate.TOMORROW
                ? "bg-primary text-white"
                : ""
            }`}
          >
            Tomorrow
          </button>
        </div>
        <p>or select your date</p>
        <DatePicker
          className="w-full"
          value={customButtonDate !== null ? null : deadline}
          onChange={(date) => {
            setDeadlineError(false);
            setDeadline(date);
          }}
          onOpen={() => setCustomButtonDate(null)}
          format="DD/MM/YYYY"
        />
        {deadlineError && (
          <p className="text-red-500">{AddTaskError.DEADLINE}</p>
        )}
      </form>
    </section>
  );
};

export default AddTask;
