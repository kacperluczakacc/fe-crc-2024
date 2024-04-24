import { useRef } from "react";
import { Task } from "../App"

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({setTasks}: AddTaskProps) {
    // taskNameRef to obiekt, który ma następującą strukturę
    // taskNameRef: { current }
    const taskNameRef = useRef<HTMLInputElement>(null);
    const taskAuthorRef = useRef<HTMLInputElement>(null);
    const taskDeadlineRef = useRef<HTMLInputElement>(null);

    function handleAddTask() {
            if (taskNameRef.current)
            setTasks(prevTask => [...prevTask, {
                title: taskNameRef.current!.value,
                author: taskAuthorRef.current!.value,
                deadline: taskDeadlineRef.current!.value
            }]);
    }

    return (
        <div>
            <button onClick={handleAddTask} type="button" className="border">ADD TASK</button>
            <form className="flex flex-col gap-1 my-2">
                <label>Task Name</label>
                <input ref={taskNameRef} className="border" type="text" />
                <label>Author</label>
                <input ref={taskAuthorRef} className="border" type="text" />
                <label>Deadline</label>
                <input ref={taskDeadlineRef} className="border" type="text" />
            </form>
        </div>
    )
}