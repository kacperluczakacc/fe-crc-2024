import {TaskType} from "../App.tsx";
import React, {useRef} from "react";

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export default function AddTask({setTasks}: AddTaskProps) {
    //taskNameRef to obiekt który ma strukture
    // taskNameRef: { currect }
    const taskNameRef = useRef<HTMLInputElement>(null)
    const authorRef = useRef<HTMLInputElement>(null)
    const deadlineRef = useRef<HTMLInputElement>(null)



    function handleAddTask() {
        if(taskNameRef.current && authorRef.current && deadlineRef.current) {
            setTasks(prevTasks => [...prevTasks, {
                title: taskNameRef.current!.value,
                author: authorRef.current!.value,
                deadline: deadlineRef.current!.value,
            }])
        }
    }

    return (
        <div>
            <button onClick={handleAddTask} type="button" className="border-1">ADD TASK</button>
            <form className="flex-col gap-1 mt-2 my-2">
                <label>Task name:</label>
                <input ref={taskNameRef} className="border" type="text"/>
                <label>Author:</label>
                <input ref={authorRef} className="border" type="text"/>
                <label>Deadline:</label>
                <input ref={deadlineRef} className="border" type="text"/>
            </form>
        </div>
    )
}
