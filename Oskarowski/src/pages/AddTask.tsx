import { useEffect, useRef, useState } from "react";
import { TaskType } from "../types/Task";

import { IoMdClose as CloseIcon } from "react-icons/io";
import { CONSTANCE } from "../lib/constances";

type TAddTaskProps = {
    setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export default function AddTask({ setTask }: TAddTaskProps) {
    const [taskName, setTaskName] = useState("");
    const [taskNameError, setTaskNameError] = useState(false);

    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskDeadlineError, setTaskDeadlineError] = useState(false);

    const [taskAuthor, setTaskAuthor] = useState("");
    const [taskAuthorError, setTaskAuthorError] = useState(false);

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

    function hideError(setError: Function) {
        setError(false);
    }

    function handleAddTask() {
        if (
            taskNameError ||
            taskDeadlineError ||
            taskAuthorError ||
            taskDeadline.length === 0
        ) {
            return;
        }

        console.log("Task added", taskName, taskAuthor, taskDeadline);

        setTask((prevTasks) => [
            ...prevTasks,
            {
                title: taskName,
                author: taskAuthor,
                deadline: taskDeadline,
            },
        ]);
    }

    return (
        <section className="container flex flex-col mx-auto">
            <form className="max-w-md p-6 mt-2 bg-white rounded-lg ">
                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskName"
                        className="absolute text-gray-700 bg-white -top-3 left-2 rounded-2xl"
                    >
                        Task Name:
                    </label>
                    <input
                        onInput={(v) => setTaskName(v.currentTarget.value)}
                        onFocus={() => hideError(setTaskNameError)}
                        type="text"
                        id="taskName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {taskNameError && <p>Task name is empty: Add text</p>}
                </div>
                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskAuthor"
                        className="absolute text-gray-700 bg-white -top-3 left-2 rounded-2xl"
                    >
                        Author:
                    </label>
                    <input
                        onInput={(v) => setTaskAuthor(v.currentTarget.value)}
                        onFocus={() => hideError(setTaskAuthorError)}
                        type="text"
                        id="taskAuthor"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {taskAuthorError && <p>Author is empty: Add text</p>}
                </div>
                <div className="relative flex flex-col mb-4">
                    <label
                        htmlFor="taskDeadline"
                        className="absolute text-gray-700 bg-white -top-3 left-2 rounded-2xl"
                    >
                        Deadline:
                    </label>
                    <input
                        onInput={(v) => setTaskDeadline(v.currentTarget.value)}
                        onFocus={() => hideError(setTaskDeadlineError)}
                        type="text"
                        id="taskDeadline"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {taskDeadlineError && <p>Deadline is not valid</p>}
                </div>
            </form>
            <button
                type="button"
                onClick={handleAddTask}
                className="block px-6 py-3 mx-auto mt-4 font-bold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                ADD TASK
            </button>
        </section>
    );
}
