import { useEffect, useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Endpoint } from "../api/constants";

enum CustomDate {
    TODAY,
    TOMORROW,
}

interface TaskState {
    taskName: string;
    author: string;
    deadline: Dayjs | null;
    selectedDateButton: CustomDate | null;
    taskNameError: boolean;
    authorError: boolean;
    deadlineError: boolean;
}

type TaskAction =
    | { type: "UPDATE_TASK_NAME"; payload: string }
    | { type: "UPDATE_AUTHOR"; payload: string }
    | { type: "UPDATE_DEADLINE"; payload: Dayjs | null }
    | { type: "UPDATE_SELECTED_DATE_BUTTON"; payload: CustomDate | null }
    | { type: "SET_TASK_NAME_ERROR"; payload: boolean }
    | { type: "SET_AUTHOR_ERROR"; payload: boolean }
    | { type: "SET_DEADLINE_ERROR"; payload: boolean };

const initialTaskState: TaskState = {
    taskName: "",
    author: "",
    deadline: null,
    selectedDateButton: null,
    taskNameError: false,
    authorError: false,
    deadlineError: false,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case "UPDATE_TASK_NAME":
            return { ...state, taskName: action.payload };
        case "UPDATE_AUTHOR":
            return { ...state, author: action.payload };
        case "UPDATE_DEADLINE":
            return { ...state, deadline: action.payload };
        case "UPDATE_SELECTED_DATE_BUTTON":
            return { ...state, selectedDateButton: action.payload };
        case "SET_TASK_NAME_ERROR":
            return { ...state, taskNameError: action.payload };
        case "SET_AUTHOR_ERROR":
            return { ...state, authorError: action.payload };
        case "SET_DEADLINE_ERROR":
            return { ...state, deadlineError: action.payload };
        default:
            return state;
    }
}

const AddTask = () => {
    const history = useHistory();
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    const {
        taskName,
        author,
        deadline,
        selectedDateButton,
        taskNameError,
        authorError,
        deadlineError,
    } = state;

    const isNameValid = taskName.length >= 3;
    const isauthorValid = author.length >= 3;
    const isdeadlineValid = deadline !== null;

    function validateInputs() {
        dispatch({ type: "SET_TASK_NAME_ERROR", payload: !isNameValid });
        dispatch({ type: "SET_AUTHOR_ERROR", payload: !isauthorValid });
        dispatch({ type: "SET_DEADLINE_ERROR", payload: !isdeadlineValid });
    }

    useEffect(() => {
        dispatch({
            type: "SET_TASK_NAME_ERROR",
            payload: taskName.length > 0 && !isNameValid,
        });
        dispatch({
            type: "SET_AUTHOR_ERROR",
            payload: author.length > 0 && !isauthorValid,
        });
    }, [name, author]);

    useEffect(() => {
        if (selectedDateButton === null) {
            dispatch({ type: "UPDATE_DEADLINE", payload: null });
        } else {
            dispatch({
                type: "UPDATE_DEADLINE",
                payload: selectedDateButton === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day"),
            });
            dispatch({ type: "SET_DEADLINE_ERROR", payload: false });
        }
    }, [selectedDateButton]);

    async function saveNewTask() {
        const response = await fetch(Endpoint.TASKS, {
            method: "POST",
            body: JSON.stringify({
                title: taskName,
                author: author,
                deadline: deadline?.toString(),
            }),
        });

        return response;
    }

    async function handleSaveClick() {
        if (isNameValid && isauthorValid && isdeadlineValid) {
            const response = await saveNewTask();

            if (response.ok) {
                history.push(ROUTE.HOME);
            }
        } else {
            validateInputs();
        }
    }

    function handleDateButtonClick(date: CustomDate) {
        dispatch({
            type: "UPDATE_SELECTED_DATE_BUTTON",
            payload: selectedDateButton === date ? null : date,
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
                        onInput={(input) => dispatch({ type: "UPDATE_TASK_NAME", payload: input.currentTarget.value })}
                        className="border h-14 p-4"
                        type="text"
                    />
                    {taskNameError && <p className="text-red-500">{AddTaskError.TASK_NAME}</p>}
                </div>

                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">
                        Author
                    </label>
                    <input
                        className="border h-14 p-4"
                        type="text"
                        onInput={(input) => dispatch({ type: "UPDATE_AUTHOR", payload: input.currentTarget.value })}
                    />
                    {authorError && <p className="text-red-500">{AddTaskError.AUTHOR}</p>}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => handleDateButtonClick(CustomDate.TODAY)}
                        className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${selectedDateButton === CustomDate.TODAY ? "bg-primary text-white" : ""
                            } `}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDateButtonClick(CustomDate.TOMORROW)}
                        className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${selectedDateButton === CustomDate.TOMORROW ? "bg-primary text-white" : ""
                            }`}
                    >
                        Tomorrow
                    </button>
                </div>

                <p>or select your date</p>

                <div>
                    <DatePicker
                        className="w-full"
                        value={selectedDateButton !== null ? null : deadline}
                        onChange={(date) => {
                            dispatch({ type: "SET_DEADLINE_ERROR", payload: false });
                            dispatch({ type: "UPDATE_DEADLINE", payload: date });
                        }}
                        onOpen={() => dispatch({ type: "UPDATE_SELECTED_DATE_BUTTON", payload: null })}
                        format="DD/MM/YYYY"
                    />
                    {deadlineError && <p className="text-red-500">{AddTaskError.DEADLINE}</p>}
                </div>
            </form>
        </section>
    );
};

export default AddTask;
