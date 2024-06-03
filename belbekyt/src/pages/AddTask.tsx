import { useEffect, useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../api/constants";

enum CustomDate {
    TODAY,
    TOMMOROW
}

type Action =
    | { type: 'SET_DEADLINE', payload: Dayjs | null }
    | { type: 'SET_CUSTOM_BUTTON_DATE', payload: CustomDate | null }
    | { type: 'SET_TASK_NAME', payload: string }
    | { type: 'SET_AUTHOR', payload: string }
    | { type: 'SET_TASK_NAME_ERROR', payload: boolean }
    | { type: 'SET_DEADLINE_ERROR', payload: boolean }
    | { type: 'SET_AUTHOR_ERROR', payload: boolean }
    | { type: 'SET_ERRORS' };


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

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_DEADLINE':
            return { ...state, deadline: action.payload };
        case 'SET_CUSTOM_BUTTON_DATE':
            return { ...state, customButtonDate: action.payload };
        case 'SET_TASK_NAME':
            return { ...state, taskName: action.payload };
        case 'SET_AUTHOR':
            return { ...state, author: action.payload };
        case 'SET_TASK_NAME_ERROR':
            return { ...state, taskNameError: action.payload };
        case 'SET_DEADLINE_ERROR':
            return { ...state, deadlineError: action.payload };
        case 'SET_AUTHOR_ERROR':
            return { ...state, authorError: action.payload };
        case 'SET_ERRORS':
            const isTaskNameValid = state.taskName.length >= 3;
            const isAuthorValid = state.author.length >= 3;
            const isDeadlineValid = state.deadline !== null;
            return {
                ...state,
                taskNameError: !isTaskNameValid,
                deadlineError: !isDeadlineValid,
                authorError: !isAuthorValid,
            };
        default:
            return state;
    }
}


export default function AddTask() {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    const isTaskNameValid = state.taskName.length >= 3;
    const isAuthorValid = state.author.length >= 3;
    const isDeadlineValid = state.deadline !== null;

    function setErrors() {
        dispatch({ type: 'SET_ERRORS' });
    }

    useEffect(() => {
        dispatch({ type: 'SET_TASK_NAME_ERROR', payload: state.taskName.length > 0 && !isTaskNameValid });
        dispatch({ type: 'SET_AUTHOR_ERROR', payload: state.author.length > 0 && !isAuthorValid });
    }, [state.taskName, state.author]);

    useEffect(() => {
        if (state.customButtonDate === null) {
            dispatch({ type: 'SET_DEADLINE', payload: null });
        } else {
            const newDeadline = state.customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day");
            dispatch({ type: 'SET_DEADLINE', payload: newDeadline });
            dispatch({ type: 'SET_DEADLINE_ERROR', payload: false });
        }
    }, [state.customButtonDate]);

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
        if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
            const response = await addNewTaskToServer();

            if (response.ok) {
                history.push(ROUTE.HOME);
            }
        } else {
            setErrors();
        }
    }

    function handleCustomButtonClick(date: CustomDate) {
        dispatch({ type: 'SET_CUSTOM_BUTTON_DATE', payload: state.customButtonDate === date ? null : date });
    }

    return (
        <section>
            <div className="flex justify-between items-center p-4">
                <Link to={ROUTE.HOME}>
                    <CloseIcon size={24} />
                </Link>
                <h1 className="text-xl">Create new task</h1>
                <button className="text-primary font-bold" onClick={handleSaveClick}>Save</button>
            </div>
            <form className="flex flex-col gap-10 my-6 px-5">
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Task name:</label>
                    <input
                        onInput={(input) => dispatch({ type: 'SET_TASK_NAME', payload: input.currentTarget.value })}
                        className="border h-14 p-4"
                        type="text"
                    />
                    {state.taskNameError && <p className="text-red-500">{AddTaskError.TASK_NAME}</p>}
                </div>

                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Author:</label>
                    <input
                        className="border h-14 p-4"
                        type="text"
                        onInput={(input) => dispatch({ type: 'SET_AUTHOR', payload: input.currentTarget.value })}
                    />
                    {state.authorError && <p className="text-red-500">{AddTaskError.AUTHOR}</p>}
                </div>

                <div className="flex gap-4 ">
                    <button
                        type="button"
                        onClick={() => handleCustomButtonClick(CustomDate.TODAY)}
                        className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${state.customButtonDate === CustomDate.TODAY ? 'bg-primary text-white' : ''}`}
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCustomButtonClick(CustomDate.TOMMOROW)}
                        className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${state.customButtonDate === CustomDate.TOMMOROW ? 'bg-primary text-white' : ''}`}
                    >
                        Tommorow
                    </button>
                </div>

                <p>Or select your date</p>

                <div>
                    <DatePicker
                        className="w-full"
                        value={state.customButtonDate !== null ? null : state.deadline}
                        onChange={(date) => {
                            dispatch({ type: 'SET_DEADLINE', payload: date });
                            dispatch({ type: 'SET_DEADLINE_ERROR', payload: false });
                        }}
                        onOpen={() => dispatch({ type: 'SET_CUSTOM_BUTTON_DATE', payload: null })}
                        format="DD/MM/YYYY"
                    />
                    {state.deadlineError && <p>{AddTaskError.DEADLINE}</p>}
                </div>
            </form>
        </section>
    );
}
