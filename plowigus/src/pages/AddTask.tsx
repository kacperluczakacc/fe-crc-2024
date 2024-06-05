import { useEffect, useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../api/constants";

enum CustomDate {
  TODAY,
  TOMORROW,
}

const initialState = {
  taskName: "",
  author: "",
  deadline: null,
  customButtonDate: null,
  taskNameError: false,
  deadlineError: false,
  authorError: false,
};

function reducer(
  state: typeof initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "SET_TASK_NAME":
      return { ...state, taskName: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_DEADLINE":
      return { ...state, deadline: action.payload };
    case "SET_CUSTOM_BUTTON_DATE":
      return { ...state, customButtonDate: action.payload };
    case "SET_TASK_NAME_ERROR":
      return { ...state, taskNameError: action.payload };
    case "SET_DEADLINE_ERROR":
      return { ...state, deadlineError: action.payload };
    case "SET_AUTHOR_ERROR":
      return { ...state, authorError: action.payload };
    default:
      return state;
  }
}

export default function AddTask() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    taskName,
    author,
    deadline,
    customButtonDate,
    taskNameError,
    deadlineError,
    authorError,
  } = state;

  const isTaskNameValid = taskName.length >= 3;
  const isAuthorValid = author.length >= 3;
  const isDeadlineValid = deadline !== null;

  function setErrors() {
    dispatch({ type: "SET_TASK_NAME_ERROR", payload: !isTaskNameValid });
    dispatch({ type: "SET_AUTHOR_ERROR", payload: !isAuthorValid });
    dispatch({ type: "SET_DEADLINE_ERROR", payload: !isDeadlineValid });
  }

  useEffect(() => {
    dispatch({
      type: "SET_TASK_NAME_ERROR",
      payload: taskName.length > 0 && !isTaskNameValid,
    });
    dispatch({
      type: "SET_AUTHOR_ERROR",
      payload: author.length > 0 && !isAuthorValid,
    });
  }, [taskName, author]);

  useEffect(() => {
    if (customButtonDate === null) {
      dispatch({ type: "SET_DEADLINE", payload: null });
    } else {
      dispatch({
        type: "SET_DEADLINE",
        payload:
          customButtonDate === CustomDate.TODAY
            ? dayjs()
            : dayjs().add(1, "day"),
      });
      dispatch({ type: "SET_DEADLINE_ERROR", payload: false });
    }
  }, [customButtonDate]);

  async function addNewTaskToServer() {
    const response = await fetch(Endpoint.TASKS, {
      method: "POST",
      body: JSON.stringify({
        title: taskName,
        author,
        deadline: deadline?.toString(),
      }),
    });

    return response;
  }

  async function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      const response = await addNewTaskToServer();

      if (response.ok) {
        history.push(ROUTE.HOME);
      }
    } else {
      setErrors();
    }
  }

  function handleCustomButtonClick(date: any) {
    dispatch({
      type: "SET_CUSTOM_BUTTON_DATE",
      payload: state.customButtonDate === date ? null : date,
    });
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
            onInput={(input) =>
              dispatch({
                type: "SET_TASK_NAME",
                payload: input.currentTarget.value,
              })
            }
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
            onInput={(input) =>
              dispatch({
                type: "SET_AUTHOR",
                payload: input.currentTarget.value,
              })
            }
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
              dispatch({ type: "SET_DEADLINE", payload: date });
              dispatch({ type: "SET_DEADLINE_ERROR", payload: false });
            }}
            onOpen={() =>
              dispatch({ type: "SET_CUSTOM_BUTTON_DATE", payload: null })
            }
            format="DD/MM/YYYY"
          />
          {deadlineError && <p>{AddTaskError.DEADLINE}</p>}
        </div>
      </form>
    </section>
  );
}
