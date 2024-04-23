import { useRef } from "react";
import { TaskType } from "../types/Task";

type TAddTaskProps = {
    setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export default function AddTask({ setTask }: TAddTaskProps) {
    const taskNameRef = useRef<HTMLInputElement>(null);
    const taskAuthorRef = useRef<HTMLInputElement>(null);
    const taskDeadlineRef = useRef<HTMLInputElement>(null);

    function handleAddTask() {
        if (
            !taskNameRef.current?.value ||
            !taskAuthorRef.current?.value ||
            !taskDeadlineRef.current?.value
        ){
            return;
        }

        setTask((prevTasks) => [
            ...prevTasks,
            {
                title: taskNameRef.current!.value,
                author: taskAuthorRef.current!.value,
                deadline: taskDeadlineRef.current!.value,
            },
        ]);
    }

    return (
        <div className="flex flex-col container mx-auto">
            <button
                type="button"
                onClick={handleAddTask}
                className="block mx-auto mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"

            >
                ADD TASK
            </button>
            <form className="max-w-md  my-2 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label
                        htmlFor="taskName"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Task Name:
                    </label>
                    <input
                        ref={taskNameRef}
                        type="text"
                        id="taskName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="taskAuthor"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Author:
                    </label>
                    <input
                        ref={taskAuthorRef}
                        type="text"
                        id="taskAuthor"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="taskDeadline"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Deadline:
                    </label>
                    <input
                        ref={taskDeadlineRef}
                        type="text"
                        id="taskDeadline"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
            </form>
        </div>
    );
}
