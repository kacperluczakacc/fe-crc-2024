import { useEffect, useRef, useState } from "react";
import { TaskType } from "../types/Task";
import { AddTaskError } from "../lib/constances.ts";
import { ROUTE } from "../lib/routes.ts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { Endpoint } from "../api/constants";

import { IoMdClose as CloseIcon } from "react-icons/io";
import { CONSTANCE } from "../lib/constances";

enum CustomDate {
    TODAY,
    TOMORROW,
}

export default function AddTask() {
    const history = useHistory();

    const [deadline, setDeadline] = useState<Dayjs | null>(null);
    const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(
        null
    );

    const [taskName, setTaskName] = useState("");
    const [taskNameError, setTaskNameError] = useState(false);

    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskDeadlineError, setTaskDeadlineError] = useState(false);

    const [taskAuthor, setTaskAuthor] = useState("");
    const [taskAuthorError, setTaskAuthorError] = useState(false);

    const isTaskNameValid = taskName.length >= 3;
    const isAuthorValid = taskAuthor.length >= 3;
    const isDeadlineValid = deadline !== null;

    useEffect(() => {
        if (taskName.length && taskName.length <= 1) {
            setTaskNameError(true);
        }

        if (taskDeadline !== "") {
            setTaskDeadlineError(!CONSTANCE.deadline.test(taskDeadline));
        }

        if (taskAuthor.length && taskAuthor.length <= 1) {
            setTaskAuthorError(true);
        }
    }, [taskName, taskDeadline, taskAuthor]);

    function setErrors() {
        setTaskNameError(!isTaskNameValid);
        setTaskAuthorError(!isAuthorValid);
        setTaskDeadlineError(!isDeadlineValid);
    }

    useEffect(() => {
        if (customButtonDate === null) {
            setDeadline(null);
        } else {
            setDeadline(
                customButtonDate === CustomDate.TODAY
                    ? dayjs()
                    : dayjs().add(1, "day")
            );
            setTaskDeadlineError(false);
        }
    }, [customButtonDate]);

    async function addNewTaskToServer() {
        const response = await fetch(Endpoint.TASKS, {
            method: "POST",
            body: JSON.stringify({
                title: taskName,
                taskAuthor,
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

    function handleCustomButtonClick(date: CustomDate) {
        setCustomButtonDate((prevValue) => (prevValue === date ? null : date));
    }

    function hideError(setError: Function) {
        setError(false);
    }

    return (
        <section className="container flex flex-col mx-auto">
            <div className="flex items-center justify-between p-4">
                <Link to={ROUTE.HOME}>
                    <CloseIcon size={24} />
                </Link>
                <h1 className="text-xl">Create new task</h1>
                <button
                    className="font-bold text-primary"
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
            <form className="flex flex-col max-w-md gap-10 p-6 px-5 my-6 mt-2 bg-white rounded-lg">
                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskName"
                        className="absolute px-2 -top-3 left-2 bg-secondary rounded-2xl"
                    >
                        Task name
                    </label>
                    <input
                        onInput={(input) =>
                            setTaskName(input.currentTarget.value)
                        }
                        onFocus={() => hideError(setTaskNameError)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        type="text"
                        id="taskName"
                    />
                    {taskNameError && (
                        <p className="text-red-500">{AddTaskError.TASK_NAME}</p>
                    )}
                </div>

                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskAuthor"
                        className="absolute px-2 -top-3 left-2 bg-secondary rounded-2xl"
                    >
                        Author
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        type="text"
                        id="taskAuthor"
                        onInput={(input) =>
                            setTaskAuthor(input.currentTarget.value)
                        }
                        onFocus={() => hideError(setTaskAuthorError)}
                    />
                    {taskAuthorError && (
                        <p className="text-red-500">{AddTaskError.AUTHOR}</p>
                    )}
                </div>

                <div className="flex gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() =>
                            handleCustomButtonClick(CustomDate.TODAY)
                        }
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
                        onClick={() =>
                            handleCustomButtonClick(CustomDate.TOMORROW)
                        }
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

                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskDeadline"
                        className="absolute px-2 -top-3 left-2 bg-secondary rounded-2xl"
                    >
                        Deadline
                    </label>
                    <DatePicker
                        className="w-full"
                        value={customButtonDate !== null ? null : deadline}
                        onChange={(date) => {
                            setDeadline(date);
                            setTaskDeadlineError(false);
                        }}
                        onOpen={() => setCustomButtonDate(null)}
                        format="DD/MM/YYYY"
                    />
                    {taskDeadlineError && (
                        <p className="text-red-500">{AddTaskError.DEADLINE}</p>
                    )}
                </div>
            </form>
            <button
                type="button"
                onClick={handleSaveClick}
                className="block px-6 py-3 mx-auto mt-4 font-bold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                ADD TASK
            </button>
        </section>
    );
}
