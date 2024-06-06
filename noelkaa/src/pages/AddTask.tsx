import { useEffect, useState } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { useTypedDispatch } from "../store";
import { addTask } from "../store/features/tasks/taskSlice";

enum CustomDate {
  TODAY,
  TOMORROW,
}
export default function AddTask() {
  const updateStore = useTypedDispatch();
  const history = useHistory();

  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(
    null
  );

  const [taskName, setTaskName] = useState("");
  const [author, setAuthor] = useState("");

  const [taskNameError, setTaskNameError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const isTaskNameValid = taskName.length >= 3;
  const isAuthorValid = author.length >= 3;
  const isDeadlineValid = deadline !== null;

  function setErrors() {
    setTaskNameError(!isTaskNameValid);
    setAuthorError(!isAuthorValid);
    setDeadlineError(!isDeadlineValid);
  }

  useEffect(() => {
    setTaskNameError(taskName.length > 0 && !isTaskNameValid);
    setAuthorError(author.length > 0 && !isAuthorValid);
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

  function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      updateStore(
        addTask({
          title: taskName,
          author,
          deadline: deadline.toString(),
        })
      );
      history.push(ROUTE.HOME);
    } else {
      setErrors();
    }
  }

  function handleCustomButtonClick(date: CustomDate) {
    setCustomButtonDate((prevValue) => (prevValue === date ? null : date));
  }

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <Link to={ROUTE.HOME}>
          <CloseIcon size={24} />
        </Link>
        <h1 className="text-xl">Create new task</h1>
        <button className="text-primary font-bold" onClick={handleSaveClick}>
          Save
        </button>
      </div>
      <form className="flex flex-col gap-10 my-6 px-5">
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Task name
          </label>
          <input
            onInput={(input) => setTaskName(input.currentTarget.value)}
            className="border h-14 p-4"
            type="text"
          />
          {taskNameError && (
            <p className="text-red-500">{AddTaskError.TASK_NAME}</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">
            Author
          </label>
          <input
            className="border h-14 p-4"
            type="text"
            onInput={(input) => setAuthor(input.currentTarget.value)}
          />
          {authorError && <p className="text-red-500">{AddTaskError.AUTHOR}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
            className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
              customButtonDate === CustomDate.TODAY
                ? "bg-primary text-white"
                : ""
            } `}
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

        <div>
          <DatePicker
            className="w-full"
            value={customButtonDate !== null ? null : deadline}
            onChange={(date) => {
              setDeadline(date);
              setDeadlineError(false);
            }}
            onOpen={() => setCustomButtonDate(null)}
            format="DD/MM/YYYY"
          />
          {deadlineError && <p>{AddTaskError.DEADLINE}</p>}
        </div>
      </form>
    </section>
    // TEMPLATE LITERAL
  );
}
