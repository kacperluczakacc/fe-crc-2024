import { useEffect, useReducer } from "react";

import { MdClose } from "react-icons/md";
import { AddTaskError } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../components/reusable/CustomButton";
import FormField from "../components/reusable/FormField";
import { CustomDate, initialState, reducer, actionTypes } from "../helpers/taskReducer";

export default function AddTask() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isTaskNameValid = state.taskName.length >= 3;
  const isAuthorValid = state.author.length >= 3;
  const isDeadlineValid = state.deadline !== null;

  function setErrors() {
    dispatch({ type: actionTypes.SET_TASK_NAME_ERROR, payload: !isTaskNameValid });
    dispatch({ type: actionTypes.SET_AUTHOR_ERROR, payload: !isAuthorValid });
    dispatch({ type: actionTypes.SET_DEADLINE_ERROR, payload: !isDeadlineValid });
  }

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_TASK_NAME_ERROR,
      payload: state.taskName.length > 0 && !isTaskNameValid,
    });
    dispatch({
      type: actionTypes.SET_AUTHOR_ERROR,
      payload: state.author.length > 0 && !isAuthorValid,
    });
  }, [state.taskName, state.author]);
  useEffect(() => {
    if (state.customButtonDate === null) {
      dispatch({ type: actionTypes.SET_DEADLINE, payload: null });
    } else {
      const newDeadline =
        state.customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day");
      dispatch({ type: actionTypes.SET_DEADLINE, payload: newDeadline });
      dispatch({ type: actionTypes.SET_DEADLINE_ERROR, payload: false });
    }
  }, [state.customButtonDate]);

  async function addNewTaskToServer() {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: state.taskName,
        author: state.author,
        deadline: state.deadline?.toString(),
      }),
    });

    return response;
  }

  async function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      const response = await addNewTaskToServer();

      if (response.ok) {
        history.push("/");
      }
    } else {
      setErrors();
    }
  }
  function handleCustomButtonClick(date: CustomDate) {
    dispatch({
      type: actionTypes.SET_CUSTOM_BUTTON_DATE,
      payload: state.customButtonDate === date ? null : date,
    });
  }

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <Link to="/">
          <MdClose size={24} />
        </Link>

        <h1 className="text-xl">Create new task</h1>
        <button className="text-primary font-bold" onClick={handleSaveClick}>
          Save
        </button>
      </div>
      <form className="flex flex-col gap-10 my-6 px-5">
        <FormField
          label="Task name"
          value={state.taskName}
          onChange={(e) => dispatch({ type: actionTypes.SET_TASK_NAME, payload: e.target.value })}
          error={state.taskNameError && AddTaskError.TASK_NAME}
          id={""}
        />
        <FormField
          label="Author"
          value={state.author}
          onChange={(e) => dispatch({ type: actionTypes.SET_AUTHOR, payload: e.target.value })}
          error={state.authorError && AddTaskError.AUTHOR}
          id={""}
        />

        <div>
          <CustomButton
            isActive={state.customButtonDate === CustomDate.TODAY}
            onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
          >
            Today
          </CustomButton>
          <CustomButton
            isActive={state.customButtonDate === CustomDate.TOMORROW}
            onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)}
          >
            Tomorrow
          </CustomButton>
        </div>
        <p>or select your date</p>
        <DatePicker
          value={state.customButtonDate !== null ? null : state.deadline}
          onChange={(date) => dispatch({ type: actionTypes.SET_DEADLINE, payload: date })}
          onOpen={() => dispatch({ type: actionTypes.SET_CUSTOM_BUTTON_DATE, payload: null })}
          format="DD/MM/YYYY"
        />
        {state.deadlineError && <p>{AddTaskError.DEADLINE}</p>}
      </form>
    </section>
  );
}
