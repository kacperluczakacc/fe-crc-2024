import React, { useRef } from 'react'
import { TaskT } from '../App'

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskT[]>>
}

export default function AddNewTask({ setTasks }: AddTaskProps) {

    const taskNameRef = useRef<HTMLInputElement>(null)
    const taskAuthorRef = useRef<HTMLInputElement>(null)
    const taskDeadlineRef = useRef<HTMLInputElement>(null)

    function handleAddTask() {
        setTasks(prevTasks => [...prevTasks, { title: taskNameRef.current!.value, author: taskAuthorRef.current!.value, deadline: taskDeadlineRef.current!.value }])
    }

    return (
        <>
            <div>
                <button type="button" className="border border-solid" onClick={handleAddTask}>ADD TASK</button>
            </div>
            <form className='flex flex-col gap-1 my-2 '>
                <label>Task name:</label>
                <input className='border' type="text" ref={taskNameRef} />
                <label>Author:</label>
                <input className='border' type="text" ref={taskAuthorRef} />
                <label>Deadline:</label>
                <input className='border' type="text" ref={taskDeadlineRef} />
            </form>
        </>
    )
}
