import { MdClose as CloseIcon } from 'react-icons/md'

import { useEffect, useRef, useState } from "react";
import { Task } from "../App"
import { RegExp } from '../lib/constans';

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({setTasks}: AddTaskProps) {
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');

    const [taskNameError, setTaskNameError] = useState(false);
    const [deadlineError, setDeadlineError] = useState(false);

    // Zrobić walidację tekstu dla Author (przerobić na reużywalną funkcję)

    function hideTaskError() {
        setTaskNameError(false);
    }
    function hideDeadlineError() {
        setDeadlineError(false);
    }

    function handleAddTask() {
        if (taskName.length == 0) {
            setTaskNameError(true);
        }
        if (!RegExp.deadline.test(deadline)) {
            setDeadlineError(true);
        }
        // setTasks(prevTasks => [
        //     ...prevTasks,
        //     {
        //         title: taskNameRef.current!.value,
        //         title: authorRef.current!.value,
        //         title: deadlineRef.current!.value
        //     }
        // ]);
    }

    return (
        <section>
            <div className='flex justify-between items-center p-4'>
                <CloseIcon size={24} />
                <h1 className='text-xl'>Create new task</h1>
                <button onClick={handleAddTask} className='text-primary font-bold'>Save</button>
            </div>
            <form className="flex flex-col gap-10 my-4 px-5">

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Task Name</label>
                    <input onFocus={hideTaskError} onInput={inputValue => setTaskName(inputValue.currentTarget.value)} className="border h-14 p-4" type="text" />
                    { taskNameError && <p>Task name is empty. Please add text</p> }
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Author</label>
                    <input className="border h-14 p-4" type="text" />
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline</label>
                    <input onFocus={hideDeadlineError} onInput={inputValue => setDeadline(inputValue.currentTarget.value)} className="border h-14 p-4" type="text" />
                    { deadlineError && <p>Deadline is in a wrong format (DD/MM/YYYY). Please correct</p> }
                </div>

            </form>
        </section>
    )
}