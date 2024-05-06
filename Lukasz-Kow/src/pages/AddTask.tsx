import { MdClose as CloseIcon } from "react-icons/md";

import { useEffect, useState } from "react"
import { Task } from "../App"
import { RegExp, ROUTE } from "../lib/constants";
import { Link } from "react-router-dom";

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}



export default function AddTask({ setTasks }: AddTaskProps) {
    const [taskName, setTaskName] = useState('');
    const [author, setAuthor] = useState('');
    const [deadline, setDeadline] = useState('');
    const [connection, setConnection] = useState(false)

    const [authorError, setAuthorError] = useState(false)
    const [taskNameError, setTaskNameError] = useState(false)
    const [deadlineError, setDeadlineError] = useState(false)


    function hideTaskNameError() {
        setTaskNameError(false)
    }

    function hideAuthorError() {
        setAuthorError(false)
    }
    function hideDeadlineError() {
        setDeadlineError(false)
    }

    useEffect(() => {
        setTaskNameError(taskName.length > 0 && taskName.length < 3)

    }, [taskName])

    useEffect(() => {
        if (!taskNameError && taskName !== '' && deadline !== '' && !deadlineError && author !== '' && !authorError) {
            setConnection(true)
        } else {
            setConnection(false)
        }
    }, [taskName, author, deadline, taskNameError])

    function handleAddTask() {
        taskName === '' && setTaskNameError(true)
        taskName.length > 0 && taskName.length <= 2 && setTaskNameError(true)
        deadline === '' && deadline.length < 1 ? setDeadlineError(true) : setDeadlineError(false)
        author === '' && setAuthorError(true)

        RegExp.DEADLINE.test(deadline) ? setDeadlineError(false) : setDeadlineError(true)

        if (connection) {
            setTasks(prevTasks => [...prevTasks, { title: taskName, author: author, deadline: deadline }])
        }

    }




    return (
        <section>
            <div className="flex justify-between items-center p-4">
                <Link to={ROUTE.HOME}>
                    <CloseIcon size={24} />
                </Link>
                <h1 className="text-xl">Create New Task</h1>
                <Link to={connection ? ROUTE.HOME : ROUTE.ADD_TASKS}>
                    <button onClick={handleAddTask} className="text-primary font-bold ">
                        Save
                    </button>
                </Link>
            </div>

            <form className="flex flex-col gap-10 my-6 px-5 ">
                <div className="flex flex-col relative">
                    <label className="absolute -top-2 bg-secoundary px-2 text-xs mx-2">Task name:</label>
                    <input onFocus={hideTaskNameError} onInput={(input) => setTaskName(input.currentTarget.value)} className={`border h-14 p-4 ${taskNameError && 'border-red-500'}`}
                        type='text'
                    />

                    <p className='text-red-500 h-5 text-sm'>
                        {(taskName.length > 0 && taskName.length <= 2 && 'Title should be at least 3 characters') ||
                            (taskNameError && 'Title is required.')}
                    </p>
                </div>

                <div className="flex flex-col relative">
                    <label className="absolute -top-2 bg-secoundary px-2 text-xs mx-2">Author:</label>
                    <input onFocus={hideAuthorError} onInput={(input) => setAuthor(input.currentTarget.value)} className={`border h-14 p-4 ${authorError && 'border-red-500'}`}
                        type='text'
                    />
                    <p className='text-red-500 h-5 text-sm'>{authorError && 'Author is required.'}</p>
                </div>

                <div className="flex flex-col relative">
                    <label className="absolute -top-2 bg-secoundary px-2 text-xs mx-2">Deadline:</label>
                    <input onFocus={hideDeadlineError} onInput={(input) => setDeadline(input.currentTarget.value)} className={`border h-14 p-4 ${deadlineError && 'border-red-500'}`} type="text" />
                    <p className='text-red-500 h-5 text-sm'>
                        {(!RegExp.DEADLINE.test(deadline) &&
                            deadline.length > 0 &&
                            'Deadline is in a wrong format (DD/MM/YYYY). Please correct') ||
                            (deadlineError && 'Deadline is required.')}
                    </p>
                </div>
            </form>
        </section >
    )
}