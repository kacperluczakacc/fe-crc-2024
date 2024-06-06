import { useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../api/constants";

//Zmiana z usestate'ow na usereducera ponizej

enum CustomDate {
  TODAY,
  TOMORROW,
}

interface State {
  deadline: Dayjs | null;
  customButtonDate: CustomDate | null;
  taskName: string;
  author: string;
  taskNameError: boolean;
  deadlineError: boolean;
  authorError: boolean;
}

const initialState: State = {
  deadline: null,
  customButtonDate: null,
  taskName: "",
  author: "",
  taskNameError: false,
  deadlineError: false,
  authorError: false,
};

enum ActionType {
  SET_DEADLINE,
  SET_CUSTOM_BUTTON_DATE,
  SET_TASK_NAME,
  SET_AUTHOR,
  SET_ERRORS,
}

interface Action {
  type: ActionType;
  payload?: any;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SET_DEADLINE:
      return {
        ...state,
        deadline: action.payload,
        deadlineError: !action.payload,
      };
    case ActionType.SET_CUSTOM_BUTTON_DATE:
      const customButtonDate = action.payload === state.customButtonDate ? null : action.payload;
      return {
        ...state,
        customButtonDate,
        deadline: customButtonDate === null ? state.deadline : customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day"),
        deadlineError: false,
      };
    case ActionType.SET_TASK_NAME:
      return {
        ...state,
        taskName: action.payload,
        taskNameError: action.payload.length > 0 && action.payload.length < 3,
      };
    case ActionType.SET_AUTHOR:
      return {
        ...state,
        author: action.payload,
        authorError: action.payload.length > 0 && action.payload.length < 3,
      };
    case ActionType.SET_ERRORS:
      return {
        ...state,
        taskNameError: state.taskName.length > 0 && state.taskName.length < 3,
        authorError: state.author.length > 0 && state.author.length < 3,
        deadlineError: !state.deadline,
      };
    default:
      return state;
  }
}

export default function AddTask() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addNewTaskToServer() {
    const response = await fetch(Endpoint.TASKS, {
      method: "POST",
      body: JSON.stringify({
        title: state.taskName,
        author: state.author,
        deadline: state.deadline?.toString()
      })
    });

    return response;
  }

  async function handleSaveClick() {
    dispatch({ type: ActionType.SET_ERRORS });
    if (!state.taskNameError && !state.authorError && !state.deadlineError) {
      const response = await addNewTaskToServer();
      if (response.ok) {
        history.push(ROUTE.HOME);
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
            onInput={(input) => dispatch({ type: ActionType.SET_TASK_NAME, payload: input.currentTarget.value })}
            className="border h-14 p-4"
            type="text"
          />
          {state.taskNameError && (
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
            onInput={(input) => dispatch({ type: ActionType.SET_AUTHOR, payload: input.currentTarget.value })}
          />
          {state.authorError && <p className="text-red-500">{AddTaskError.AUTHOR}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => dispatch({ type: ActionType.SET_CUSTOM_BUTTON_DATE, payload: CustomDate.TODAY })}
            className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
              state.customButtonDate === CustomDate.TODAY
                ? "bg-primary text-white"
                : ""
            } `}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: ActionType.SET_CUSTOM_BUTTON_DATE, payload: CustomDate.TOMORROW })}
            className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
              state.customButtonDate === CustomDate.TOMORROW
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
            value={state.customButtonDate !== null ? null : state.deadline}
            onChange={(date) => dispatch({ type: ActionType.SET_DEADLINE, payload: date })}
            onOpen={() => dispatch({ type: ActionType.SET_CUSTOM_BUTTON_DATE, payload: null })}
            format="DD/MM/YYYY"
          />
          {state.deadlineError && <p>{AddTaskError.DEADLINE}</p>}
        </div>
      </form>
    </section>
  );
}