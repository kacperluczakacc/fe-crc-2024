import { MdClose } from 'react-icons/md'
import React, { useState,useRef, useEffect } from 'react'
import { Task } from '../App'
import { RegExp } from '../../lib/constants'
import { errorsContent } from '../../lib/constants'


type AddTaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const AddTaskForm = ({ setTasks }:AddTaskFormProps) => {

    const [taskName, setTaskName] = useState<string | null>(null)
    const [taskAuthor, setTaskAuthor] = useState<string | null>(null)
    const [taskDeadline, setTaskDeadline] = useState<string | null>(null)
    const [taskNameError, setTaskNameError] = useState<boolean>(false)
    const [taskAuthorError, setTaskAuthorError] = useState<boolean>(false)
    const [taskDeadlineError, setTaskDeadlineError] = useState<boolean>(false)

    const handleAddTask = () => {
        if (!taskName || taskName.length < 3) {
            setTaskNameError(true)
        }
        if (!taskAuthor || taskAuthor.length < 3) {
            setTaskAuthorError(true)
        }
        if (!taskDeadline || taskDeadline.length === 0 || !RegExp.deadline.test(taskDeadline)) {
            console.log('Invalid deadline format')
            setTaskDeadlineError(true)
        }

        if (taskName && taskAuthor && taskDeadline && taskName.length >= 3 && taskAuthor.length >= 3 && RegExp.deadline.test(taskDeadline) ){
            setTasks(prevTasks => [...prevTasks, {
                title: taskName,
                author: taskAuthor,
                deadline: taskDeadline
            }])
        } else {
            console.log('Task not added')
            return
        }
        
        console.log('Task added')
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

    const handleDeadlineInput = (input: React.FormEvent<HTMLInputElement>) => {
        if (taskDeadlineError) {
            setTaskDeadlineError(false)
        }
        setTaskDeadline(input.currentTarget.value)
    }

    // useEffect(() => {
    //     if (!RegExp.deadline.test(taskDeadline)) {
    //         console.log('Invalid deadline format')
    //     }
    // }, [taskDeadline])

    return (
        <section className='px-4'>
            <div className='flex justify-between items-center p-4'>
                <MdClose size={24} />
                <h1 className='text-xl'>Create new task</h1>
                <button className='text-primary font-semibold rounded-full' onClick={handleAddTask}>Save</button>
            </div>
            <form className='flex flex-col justify-center gap-10 my-6'>

                <div className='flex flex-col relative'>
                <label className='absolute -top-3 left-2 bg-secondary' htmlFor='taskName'>Task name</label>
                <input onInput={(input)=> handleTasknameInput(input)}
                 className={`rounded-md border h-14 p-4 peer
                  invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error` + (taskNameError ? ' border-error' : '')}
                 type='text' placeholder={taskName === null ? 'Task name' : ''}
                 pattern='.{3,}'
                 required
                  />
                    <span className='mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block'>
                        {( taskName && (taskName.length < 3 && taskName.length>0))? errorsContent.taskNameLength : (taskNameError && `Title ${errorsContent.requiredField}`)}
                    </span>
                </div>

                <div className='flex flex-col relative'>
                <label className='absolute -top-3 left-2 bg-secondary'  htmlFor='taskAuthor'>Author</label>
                <input onInput={(input)=> handleAuthorInput(input)}
                 type='text' placeholder={taskAuthor === null ? 'Author' : ''}
                 className={`rounded-md border h-14 p-4 peer
                  invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error` + (taskAuthorError ? ' border-error' : '')}
                 pattern='.{3,}'
                 required
                />
                    <span className="mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block">
                        {(taskAuthor && (taskAuthor.length < 3 && taskAuthor.length>0)) ? errorsContent.taskAuthorLength : (taskAuthorError && `Author ${errorsContent.requiredField}`)}
                    </span>
                </div>

                <div className='flex flex-col relative'>
                <label className='absolute -top-3 left-2 bg-secondary'  htmlFor='taskDeadline'>Deadline</label>
                <input
                 onInput={(input)=> handleDeadlineInput(input)}
                 className={`rounded-md border h-14 p-4 peer
                 invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error` + (taskDeadlineError ? ' border-error' : '')}
                 type='text' placeholder={taskDeadline === null ? 'DD/MM/YYYY' : ''}
                 pattern={RegExp.deadline.source}
                 required
                  />
                    <span className="mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block">
                        {(taskDeadline) ? errorsContent.invalidDeadline : (taskDeadlineError && `Deadline ${errorsContent.requiredField}`) }
                    </span>
                </div>
            </form>
        </section>
    )
}