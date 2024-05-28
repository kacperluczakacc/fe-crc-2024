/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md";
// import { RegExp } from '../lib/constants';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE } from '../lib/constants'
import { useTypedDispatch } from '../store';
import { addTask } from '../store/features/tasks/taskSlice';

enum CustomDate {
    TODAY,
    TOMORROW
}

export default function AddNewTask() {

    const updateStore = useTypedDispatch()

    const history = useHistory();

    const [taskName, setTaskName] = useState('')
    const [taskNameErr, setTaskNameErr] = useState(false)

    const [taskAuthor, setTaskAuthor] = useState('')
    const [taskAuthorErr, setTaskAuthorErr] = useState(false)

    const [taskDeadline, setTaskDeadline] = useState<Dayjs | null>()
    const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>()
    const [taskDeadlineErr, setTaskDeadlineErr] = useState(false)

    const isTaskNameValid = taskName?.length >= 3
    const isTaskAuthorValid = taskAuthor?.length >= 3
    const isDeadlineValid = taskDeadline != null

    function handleSaveClick() {
        if (isTaskNameValid && isTaskAuthorValid && isDeadlineValid) {
            updateStore(addTask({
                title: taskName,
                author: taskAuthor,
                deadline: taskDeadline
            }))
            history.goBack()
        } else {
            setError()
        }
    }

    function handleCustomButtonClick(date: CustomDate) {
        setCustomButtonDate((prevValue) => prevValue == date ? null : date)
    }

    function setError() {
        setTaskNameErr(!isTaskNameValid)
        setTaskAuthorErr(!isTaskAuthorValid)
        setTaskDeadlineErr(!isDeadlineValid)
    }

    useEffect(() => {
        setTaskNameErr(taskName.length > 0 && !isTaskNameValid)
        setTaskAuthorErr(taskAuthor.length > 0 && !isTaskAuthorValid)
    }, [taskName, taskAuthor])

    useEffect(() => {
        if (customButtonDate == null) {
            setTaskDeadline(null)
        } else {
            setTaskDeadline(customButtonDate == CustomDate.TODAY ? dayjs() : dayjs().add(1, "day") )
            setTaskDeadlineErr(false)
        }
    }, [customButtonDate])

    return (
        <>
            <section>
                <div className='flex justify-between items-center p-4'>
                    <Link to={ROUTE.HOME}>
                    <MdClose size={24} />
                    </Link>
                    <h1>Create new task</h1>
                    <button onClick={handleSaveClick} type='button' className='text-dark font-bold'>
                        Save
                    </button>
                </div>
                <form className='flex flex-col gap-10 my-6 px-5'>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Title:</label>
                        <input className='border h-14 p-4' type="text" onChange={(e) => setTaskName(e.currentTarget.value)} />
                        {taskNameErr && <p>blad</p>}
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='absolute -top-3 left-2 bg-light px-2'>Author:</label>
                        <input className='border h-14 p-4' type="text" onChange={(e) => setTaskAuthor(e.currentTarget.value)} />
                        {taskAuthorErr && <p>blad</p>}
                    </div>

                    <div className='flex gap-4'>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TODAY)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-dark hover:text-light ${customButtonDate === CustomDate.TODAY ? 'bg-dark text-white': ''}`}>Today</button>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TOMORROW)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-dark hover:text-light ${customButtonDate === CustomDate.TOMORROW ? 'bg-dark text-white': ''}`}>Tomorrow</button>
                    </div>

                    <p>or select date</p>
                    <DatePicker className='w-full' onChange={(date) => {
                        setTaskDeadline(date)
                        setTaskDeadlineErr(false)
                    }} onOpen={() => setCustomButtonDate(null)} format="DD/MM/YYYY" value={customButtonDate != null ? null : taskDeadline} />
                    {taskDeadlineErr && <p>blad</p>}
                </form>
            </section>
        </>
    )
}
