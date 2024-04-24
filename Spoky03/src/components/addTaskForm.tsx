import React, { useState,useRef } from 'react'
import { Task } from '../App'


type AddTaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const AddTaskForm = ({ setTasks }:AddTaskFormProps) => {

    const taskNameRef = useRef<HTMLInputElement>(null);
    const taskAuthorRef = useRef<HTMLInputElement>(null);
    const taskDeadlineRef = useRef<HTMLInputElement>(null);


    const handleAddTask = () => {
        if (taskNameRef.current && taskAuthorRef.current && taskDeadlineRef.current) {
            setTasks(prevTasks => [...prevTasks, {
                title: taskNameRef.current!.value,
                author: taskAuthorRef.current!.value,
                deadline: taskDeadlineRef.current!.value
            }])
        }
    }


    return (
        <div>
        <input className='rounded-md bg-slate-900 p-1 mb-1' role='button' type='button' value='Add Task' onClick={handleAddTask} />
        <form className='flex flex-col justify-center gap-3'>
            <input ref={taskNameRef} className='rounded-md bg-slate-900 p-1' type='text' placeholder='Task name' />
            <input ref={taskAuthorRef} className='rounded-md bg-slate-900 p-1' type='text' placeholder='Author' />
            <input ref={taskDeadlineRef} className='rounded-md bg-slate-900 p-1' type='text' placeholder='Deadline' />
        </form>
        </div>
    )
}