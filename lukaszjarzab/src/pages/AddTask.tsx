import { useEffect, useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, CustomDate, ROUTE } from "../lib/constants";
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Endpoint } from "../api/constants";
import { DateButton, TextInput } from "../components/addTask";

interface State {
  taskName: string;
  taskAuthor: string;
  deadline: Dayjs | null;
  customButtonDate: CustomDate | null;
  taskNameError: boolean;
  taskAuthorError: boolean;
  deadlineError: boolean;
}
export type Action =
  | { type: "SET_TASK_NAME"; payload: string }
  | { type: "SET_TASK_AUTHOR"; payload: string }
  | { type: "SET_DEADLINE"; payload: Dayjs | null }
  | { type: "SET_CUSTOM_BUTTON_DATE"; payload: CustomDate | null }
  | { type: "SET_TASK_NAME_ERROR"; payload: boolean }
  | { type: "SET_TASK_AUTHOR_ERROR"; payload: boolean }
  | { type: "SET_DEADLINE_ERROR"; payload: boolean };

const initialState = {
  taskName: "",
  taskAuthor: "",
  deadline: null,
  customButtonDate: null,
  taskNameError: false,
  taskAuthorError: false,
  deadlineError: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TASK_NAME":
      return { ...state, taskName: action.payload };
    case "SET_TASK_AUTHOR":
      return { ...state, taskAuthor: action.payload };
    case "SET_DEADLINE":
      return { ...state, deadline: action.payload };
    case "SET_CUSTOM_BUTTON_DATE":
      return { ...state, customButtonDate: action.payload };
    case "SET_TASK_NAME_ERROR":
      return { ...state, taskNameError: action.payload };
    case "SET_TASK_AUTHOR_ERROR":
      return { ...state, taskAuthorError: action.payload };
    case "SET_DEADLINE_ERROR":
      return { ...state, deadlineError: action.payload };
    default:
      return state;
  }
}

const AddTask = () => {
  const history = useHistory();
  const [inputs, dispatch] = useReducer(reducer, initialState);
  const {
    taskName,
    taskAuthor,
    deadline,
    customButtonDate,
    taskNameError,
    taskAuthorError,
    deadlineError,
  } = inputs;

  const isTaskNameValid = taskName?.length >= 3;
  const isAuthorValid = taskAuthor?.length >= 3;
  const isDeadlineValid = deadline !== null;

  function setErrors() {
    dispatch({ type: "SET_TASK_NAME_ERROR", payload: !isTaskNameValid });
    dispatch({ type: "SET_TASK_AUTHOR_ERROR", payload: !isAuthorValid });
    dispatch({ type: "SET_DEADLINE_ERROR", payload: !isDeadlineValid });
  }

  useEffect(() => {
    dispatch({
      type: "SET_TASK_NAME_ERROR",
      payload: taskName.length > 0 && !isTaskNameValid,
    });
    dispatch({
      type: "SET_TASK_AUTHOR_ERROR",
      payload: taskAuthor.length > 0 && !isAuthorValid,
    });
  }, [taskName, taskAuthor]);

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

  const hideTaskNameError = () => {
    dispatch({ type: "SET_TASK_NAME_ERROR", payload: false });
  };

  const hideTaskAuthorError = () => {
    dispatch({ type: "SET_TASK_AUTHOR_ERROR", payload: false });
  };

  function handleCustomButtonClick(date: CustomDate) {
    dispatch({
      type: "SET_CUSTOM_BUTTON_DATE",
      payload: customButtonDate === date ? null : date,
    });
  }

  async function addNewTaskToServer() {
    const response = await fetch(Endpoint.TASKS, {
      method: "POST",
      body: JSON.stringify({
        title: taskName,
        author: taskAuthor,
        deadline: deadline?.add(1, "day").toString(),
      }),
    });

    return response;
  }

  async function handleAddTask() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      const response = await addNewTaskToServer();

      if (response.ok) {
        history.push(ROUTE.HOME);
      } else {
        setErrors();
      }
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
        <TextInput
          dispatch={dispatch}
          dispatchType="SET_TASK_NAME"
          hideTaskError={hideTaskNameError}
          taskError={taskNameError}
          label="Task name"
          taskErrorText={AddTaskError.TASK_NAME}
        />
        <TextInput
          dispatch={dispatch}
          dispatchType="SET_TASK_AUTHOR"
          hideTaskError={hideTaskAuthorError}
          taskError={taskAuthorError}
          label="Task author"
          taskErrorText={AddTaskError.AUTHOR}
        />

        <div className="flex gap-4">
          <DateButton
            handleCustomButtonClick={handleCustomButtonClick}
            customButtonDate={customButtonDate}
            day={CustomDate.TODAY}
            text="Today"
          />
          <DateButton
            handleCustomButtonClick={handleCustomButtonClick}
            customButtonDate={customButtonDate}
            day={CustomDate.TOMORROW}
            text="Tomorrow"
          />
        </div>
        <p>or select your date</p>
        <DatePicker
          className="w-full"
          value={customButtonDate !== null ? null : deadline}
          onChange={(date) => {
            dispatch({ type: "SET_DEADLINE_ERROR", payload: false });
            dispatch({
              type: "SET_DEADLINE",
              payload: date ? dayjs(date) : null,
            });
          }}
          onOpen={() =>
            dispatch({ type: "SET_CUSTOM_BUTTON_DATE", payload: null })
          }
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
