import React, { useEffect, useState } from 'react'
import { TaskT } from '../App'
import { MdClose } from "react-icons/md";
import { RegExp } from '../lib/constants';

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskT[]>>
}

export default function AddNewTask({ setTasks }: AddTaskProps) {

    const [taskName, setTaskName] = useState('')
    const [taskNameEmptyErr, setTaskNameEmptyErr] = useState(false)
    const [taskNameShortErr, setTaskNameShortErr] = useState(false)

    const [taskAuthor, setTaskAuthor] = useState('')
    const [taskAuthorEmptyErr, setTaskAuthorEmptyErr] = useState(false)

    const [taskDeadline, setTaskDeadline] = useState('')
    const [taskDeadlineEmptyErr, setTaskDeadlineEmptyErr] = useState(false)
    const [taskDeadlineRegErr, setTaskDeadlineRegErr] = useState(false)

    // const taskNameRef = useRef<HTMLInputElement>(null)
    // const taskAuthorRef = useRef<HTMLInputElement>(null)
    // const taskDeadlineRef = useRef<HTMLInputElement>(null)

    // function hideTaskNameEmptyErr() {
    //     setTaskNameEmptyErr(false)
    // }

    // function hideDeadlineEmptyErr() {
    //     setTaskDeadlineEmptyErr(false)
    // }

    // function hideAuthorEmptyErr() {
    //     setTaskAuthorEmptyErr(false)
    // }

    useEffect(() => {

        //setTaskNameEmptyErr(taskName.length === 0)

        if (taskName.length > 0) {
            setTaskNameShortErr(taskName.length > 0 && taskName.length < 3)
        }

        //setTaskAuthorEmptyErr(taskAuthor.length === 0)

        //setTaskDeadlineEmptyErr(taskDeadline.length === 0)
        
        if (taskDeadline.length > 0) {
            setTaskDeadlineRegErr(!RegExp.DEADLINE.test(taskDeadline))
        }

    }, [taskName, taskAuthor, taskDeadline])

    // function handleAddTask() {
    //     setTasks(prevTasks => [...prevTasks, { title: taskNameRef.current!.value, author: taskAuthorRef.current!.value, deadline: taskDeadlineRef.current!.value }])
    // }

    function handleAddTask() {

        setTaskNameEmptyErr(taskName.length === 0)
        setTaskNameShortErr(taskName.length > 0 && taskName.length < 3)

        setTaskAuthorEmptyErr(taskAuthor.length === 0)

        setTaskDeadlineEmptyErr(taskDeadline.length === 0)
        setTaskDeadlineRegErr(!RegExp.DEADLINE.test(taskDeadline))

        if (!taskNameEmptyErr && !taskNameShortErr && !taskAuthorEmptyErr && !taskDeadlineEmptyErr && !taskDeadlineRegErr) {
            setTasks(prevTasks => [...prevTasks, { title: taskName, author: taskAuthor, deadline: taskDeadline }])
        }
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
                        <label className='absolute -top-3 left-2 bg-light px-2'>Title:</label>
                        <input className={(taskNameEmptyErr || taskNameShortErr) ? 'border h-14 p-4 border-red-700' : 'border h-14 p-4'} type="text" onChange={(e) => setTaskName(e.currentTarget.value)} />
                        {taskNameEmptyErr && <p className='text-red-700'>Title is required</p>}
                        {taskNameShortErr && <p className='text-red-700'>Title should be at least 3 characters</p>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Author:</label>
                        <input className={taskAuthorEmptyErr ? 'border h-14 p-4 border-red-700' : 'border h-14 p-4'} type="text" onChange={(e) => setTaskAuthor(e.currentTarget.value)} />
                        {taskAuthorEmptyErr && <p className='text-red-700'>Author is required</p>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Deadline:</label>
                        <input className={(taskDeadlineEmptyErr || taskDeadlineRegErr) ? 'border h-14 p-4 border-red-700' : 'border h-14 p-4'} type="text" onChange={(e) => setTaskDeadline(e.currentTarget.value)} />
                        {taskDeadlineEmptyErr && <p className='text-red-700'>Deadline is required</p>}
                        {taskDeadlineRegErr && <p className='text-red-700'>Deadline should be of DD/MM/YYYY format</p>}
                    </div>
                </form>
            </section>
        </>
    )
}
