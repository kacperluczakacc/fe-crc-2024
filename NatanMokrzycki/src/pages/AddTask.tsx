import { useEffect, useReducer, ChangeEvent } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../api/constants";
import { initialState, reducer } from "../components/taskReducer";
import { CustomDate } from "../components/taskReducer";
import dayjs from "dayjs";
import CustomDateButton from "../components/CustomDateButton";
import InputField from "../components/InputField";

export default function AddTask() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    taskName,
    author,
    deadline,
    customButtonDate,
    taskNameError,
    authorError,
    deadlineError,
  } = state;

  const isTaskNameValid = taskName.length >= 3;
  const isAuthorValid = author.length >= 3;
  const isDeadlineValid = deadline !== null;

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
      dispatch({ type: "SET_ERRORS" });
    }
  }

  function handleCustomButtonClick(date: CustomDate) {
    dispatch({
      type: "SET_CUSTOM_BUTTON_DATE",
      payload: customButtonDate === date ? null : date,
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
        <InputField
          label="Task name"
          value={taskName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_TASK_NAME",
              payload: e.currentTarget.value,
            })
          }
          error={taskNameError ? AddTaskError.TASK_NAME : undefined}
        />

        <InputField
          label="Author"
          value={author}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_AUTHOR",
              payload: e.currentTarget.value,
            })
          }
          error={authorError ? AddTaskError.AUTHOR : undefined}
        />

        <div className="flex gap-4">
          <CustomDateButton
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
            active={customButtonDate === CustomDate.TODAY}
          >
            Today
          </CustomDateButton>
          <CustomDateButton
            onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)}
            active={customButtonDate === CustomDate.TOMORROW}
          >
            Tomorrow
          </CustomDateButton>
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
