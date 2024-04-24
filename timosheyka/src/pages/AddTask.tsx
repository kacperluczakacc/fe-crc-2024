import { MdClose as CloseIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { Task } from "../App";

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({ setTasks }: AddTaskProps) {
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadline] = useState('')
    // HomeWork - validate Author

    const [taskNameError, setTaskNameError] = useState(false)
    const [deadlineError, setDeadlineError] = useState(false)

    function hideTaskError() {
        setTaskNameError(false)
    }

    function hideDeadlineError() {
        setDeadlineError(false)
    }

    useEffect(() => {
        setTaskNameError(taskName.length === 1);
        setDeadlineError(RegExp.deadline.test(deadline) === false)
    }, [taskName, deadline]);

    function handleAddTask() {
    }
    
    return (
        <section>
            <div className="flex justify-between items-center p-4">
                <CloseIcon size={24} />
                <h1 className="text-xl">Create new task</h1>
                <button onClick={handleAddTask} className="text-primary font-bold">
                    Save
                </button>
            </div>
            <form className="flex flex-col gap-10 my-6 px-5">
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Task name:</label>
                    <input onFocus={hideTaskError} onInput={(input) => setTaskName(input.currentTarget.value)} className="border h-14 p-4" type="text" />
                    {taskNameError && <p>Task Name is empty. Please add text</p>}
                </div>
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Author</label>
                    <input className="border h-14 p-4" type="text" />
                </div>
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Deadline:</label>
                    <input onFocus={hideDeadlineError} className="border h-14 p-4" type="text" />
                    {deadlineError && <p>Deadline is not set. Please add date</p>}
                </div>
            </form>
        </section>
    )
}