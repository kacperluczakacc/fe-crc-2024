import { MdClose } from 'react-icons/md'
import React, { useState } from 'react'
import { RegExp } from '../../lib/constants'
import { errorsContent } from '../../lib/constants'
import { useHistory } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { addNewTask } from '../reducers/taskReducer'
import { FormField } from './addTaskFormField';
import { useNotifyDispatch } from './notifyContext';

enum DateButtons {
    Today = 'Today',
    Tomorrow = 'Tomorrow'
}

export const AddTaskForm = () => {

    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>()
    const notifyDispatch = useNotifyDispatch()
    
    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskAuthor, setTaskAuthor] = useState<string | null>(null)
    const [taskDeadline, setTaskDeadline] = useState<Dayjs | null>(null)
    const [taskNameError, setTaskNameError] = useState<boolean>(false)
    const [taskAuthorError, setTaskAuthorError] = useState<boolean>(false)
    const [taskDeadlineError, setTaskDeadlineError] = useState<boolean>(false)
    const [dateButton, setDateButton] = useState<DateButtons | null>(null)

    const handleAddTask = () => {
        if (!taskName || taskName.length < 3) {
            setTaskNameError(true)
        }
        if (!taskAuthor || taskAuthor.length < 3) {
            setTaskAuthorError(true)
        }
        if (!taskDeadline || !RegExp.deadline.test(taskDeadline.format('DD/MM/YYYY'))) {
            console.log('Invalid deadline format')
            setTaskDeadlineError(true)
        }

        if (taskName && taskAuthor && taskDeadline && taskName.length >= 3 && taskAuthor.length >= 3 && RegExp.deadline.test(taskDeadline.format('DD/MM/YYYY'))) {

            dispatch(addNewTask({
                title: taskName,
                author: taskAuthor,
                deadline: taskDeadline,
                id: ''
            }))
            // redirect
            history.push('/');
            notifyDispatch({ type: 'SET', payload: 'Task added successfully' })
        } else {
            console.log('Task not added')
            return
        }
    }

    const handleTasknameInput = (input: React.FormEvent<HTMLInputElement>) => {
        if (taskNameError && input.currentTarget.value.length > 0) {
            setTaskNameError(false)
        }
        setTaskName(input.currentTarget.value)
    }

    const handleAuthorInput = (input: React.FormEvent<HTMLInputElement>) => {
        if (taskAuthorError && input.currentTarget.value.length > 0) {
            setTaskAuthorError(false)
        }
        setTaskAuthor(input.currentTarget.value)
    }

    // const handleDeadlineInput = (input: React.FormEvent<HTMLInputElement>) => {
    //     if (taskDeadlineError) {
    //         setTaskDeadlineError(false)
    //     }
    //     setTaskDeadline(dayjs(input.currentTarget.value))
    // }

    const handleToday = () => {
        if (dateButton === DateButtons.Today) {
            setDateButton(null)
            setTaskDeadline(null)
            return
        } else {
            setDateButton(DateButtons.Today)
            setTaskDeadline(dayjs())
        }
    }

    const handleTomorrow = () => {
        if (dateButton === DateButtons.Tomorrow) {
            setDateButton(null)
            setTaskDeadline(null)
            return
        } else {
            setDateButton(DateButtons.Tomorrow)
            setTaskDeadline(dayjs().add(1, 'day'))
        }
    }


    return (
        <section className='px-4'>
            <div className='flex justify-between items-center p-4'>
                <MdClose size={24} />
                <h1 className='text-xl'>Create new task</h1>
                <button className='text-primary font-semibold rounded-full' onClick={handleAddTask}>Save</button>
            </div>
            <form className='flex flex-col justify-center gap-10 my-6'>

                <FormField
                    label='Task name'
                    type='text'
                    value={taskName}
                    onChange={handleTasknameInput}
                    error={taskNameError}
                />
                
                <FormField
                    label='Author'
                    type='text'
                    value={taskAuthor}
                    onChange={handleAuthorInput}
                    error={taskAuthorError}
                />
                
                <p className='font-thin italic'>* Required fields</p>
                <div className='flex gap-5'>
                    <button type='button'
                        className={`text-slate-900 border font-semibold rounded-md px-2 py-1 ` + (dateButton === DateButtons.Today ? 'bg-primary text-white' : '')}
                        onClick={handleToday}
                    >Today
                    </button>
                    <button type='button'
                        className={`text-slate-900 border font-semibold rounded-md px-2 py-1 ` + (dateButton === DateButtons.Tomorrow ? 'bg-primary text-white' : '')}
                        onClick={handleTomorrow}
                    >Tomorrow
                    </button>
                </div>
                <p className='text-slate-500'>Or select your date</p>
                
                <div>
                    <DatePicker
                        format='DD/MM/YYYY'
                        value={taskDeadline}
                        onChange={(date) => setTaskDeadline(date)}
                    />
                    <div className='text-error'>
                        {taskDeadlineError && `Deadline ${errorsContent.requiredField}`}
                    </div>
                </div>
            </form>
        </section>
    )
}

