import React, { useEffect, useState } from 'react'
import { TaskT } from '../App'
import { MdClose } from "react-icons/md";
import { RegExp } from '../lib/constants';

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskT[]>>
}

export default function AddNewTask({ setTasks }: AddTaskProps) {

    const [taskName, setTaskName] = useState('')
    const [taskNameErr, setTaskNameErr] = useState(false)
    // DOROBIC WALIDACJE  dla autor uniwersalana  

    const [taskAuthor, setTaskAuthor] = useState('')


    const [taskDeadline, setTaskDeadline] = useState('')
    const [taskDeadlineErr, setTaskDeadlineErr] = useState(false)

    // const taskNameRef = useRef<HTMLInputElement>(null)
    // const taskAuthorRef = useRef<HTMLInputElement>(null)
    // const taskDeadlineRef = useRef<HTMLInputElement>(null)

    function hideTaskNameErr() {
        setTaskNameErr(false)
    }

    function hideDeadlineErr() {
        setTaskDeadlineErr(false)
    }

    useEffect(() => {
        setTaskNameErr(taskDeadline.length === 0)
        setTaskDeadlineErr(!RegExp.DEADLINE.test(taskDeadline))

    }, [taskName, taskDeadline])

    // function handleAddTask() {
    //     setTasks(prevTasks => [...prevTasks, { title: taskNameRef.current!.value, author: taskAuthorRef.current!.value, deadline: taskDeadlineRef.current!.value }])
    // }

    function handleAddTask() {
        setTasks(prevTasks => [...prevTasks, { title: taskName, author: taskAuthor, deadline: taskDeadline }])
    }

    return (
        <>
            <section>
                <div className='flex justify-between items-center p-4'>
                    <MdClose size={24} />
                    <h1>Create new task</h1>
                    <button type='button' onClick={handleAddTask} className='text-dark font-bold'>
                        Save
                    </button>
                </div>
                <form className='flex flex-col gap-10 my-6 px-5'>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Task name:</label>
                        <input onFocus={hideTaskNameErr} className='border h-14 p-4' type="text" onChange={(e) => setTaskName(e.currentTarget.value)} />
                        {taskNameErr && <p>Task name cant be empty</p>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Author:</label>
                        <input className='border h-14 p-4' type="text" onChange={(e) => setTaskAuthor(e.currentTarget.value)} />
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Deadline:</label>
                        <input onFocus={hideDeadlineErr} className='border h-14 p-4' type="text" onChange={(e) => setTaskDeadline(e.currentTarget.value)} />
                        {taskDeadlineErr && <p>Bad format</p>}
                    </div>
                </form>
            </section>
        </>
    )
}
