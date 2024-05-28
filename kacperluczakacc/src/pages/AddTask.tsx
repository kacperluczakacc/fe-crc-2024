import { DatePicker } from "@mui/x-date-pickers";
import type dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { Dispatch, useEffect, useState } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { ERROR } from "../lib/constants";
import { Task } from "../App";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

enum CustomDate {
  TODAY,
  TOMORROW,
}

type CustomButtonDate = CustomDate.TODAY | CustomDate.TOMORROW | null;

export default function AddTask({ setTasks }: { setTasks: Dispatch<Task> }) {
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [customButtonDate, setCustomButtonDate] =
    useState<CustomButtonDate>(null);
  const [taskName, setTaskName] = useState("");
  const [author, setAuthor] = useState("");
  const [taskNameError, setTaskNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const history = useHistory();

  const isTaskNameValid = taskName?.length >= 3;
  const isAuthorValid = author?.length >= 3;
  const isDeadlineValid = deadline !== null;

  function handleCustomButtonClick(date: CustomDate) {
    setCustomButtonDate((prevValue) => (prevValue === date ? null : date));
  }

  function notifySuccess() {
    toast.success("Task added successfully!", {
      position: "bottom-right"
    })
  }

  function setErrors() {
    setTaskNameError(!isTaskNameValid);
    setAuthorError(!isAuthorValid);
    setDeadlineError(!isDeadlineValid);
  }

  function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      setTasks({
        title: taskName,
        author,
        deadline,
      });
      notifySuccess();
      history.push('/');
    } else {
      setErrors();
    }
  }

  useEffect(() => {
    setAuthorError(author.length > 0 ? !isAuthorValid : false);
    setTaskNameError(taskName.length > 0 ? !isTaskNameValid : false);
  }, [taskName, author]);

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

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <Link to="/">
          <CloseIcon size={24} />
        </Link>
        <h1 className="text-xl">Create new task</h1>
        <button onClick={handleSaveClick} className="text-primary font-bold">
          Save
        </button>
      </div>
      <form className="flex flex-col gap-10 my-6 px-5">
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Task name
          </label>
          <input
            className={`border h-14 p-4 focus:outline-none focus:border-primary ${
              taskNameError ? "border-red-400 focus:border-red-400" : ""
            }`}
            onInput={(input) => setTaskName(input.currentTarget.value)}
            placeholder="Clean the bedroom"
            type="text"
          />
          {taskNameError && (
            <p className="text-red-400 text-sm mt-2">{ERROR.TASK_NAME}</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Author
          </label>
          <input
            className={`border h-14 p-4 focus:outline-none focus:border-primary  ${
              authorError ? "border-red-400 focus:border-red-400" : ""
            }`}
            onInput={(input) => setAuthor(input.currentTarget.value)}
            type="text"
          />
          {authorError && (
            <p className="text-red-400 text-sm mt-2">{ERROR.AUTHOR}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
            className={`px-4 py-[6px] border rounded-lg border-slate-300 hover:bg-primary hover:text-white ${
              customButtonDate === CustomDate.TODAY
                ? "bg-primary text-white"
                : ""
            }`}
            type="button"
          >
            Today
          </button>
          <button
            onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)}
            className={`px-4 py-[6px] border rounded-lg border-slate-300 hover:bg-primary hover:text-white ${
              customButtonDate === CustomDate.TOMORROW
                ? "bg-primary text-white"
                : ""
            }`}
            type="button"
          >
            Tomorrow
          </button>
        </div>

        <p>or select a date</p>

        <div>
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            value={customButtonDate !== null ? null : deadline}
            onChange={(date) => {
              setDeadline(date);
              setDeadlineError(false);
            }}
            onOpen={() => setCustomButtonDate(null)}
          />
          {deadlineError && (
            <p className="text-red-400 text-sm mt-2">{ERROR.DEADLINE}</p>
          )}
        </div>
      </form>
    </section>
  );
}
