import { MdClose as CloseIcon } from 'react-icons/md'

import { useRef, useState } from "react";
import { Task } from "../App"
import { RegExp } from '../lib/constans';

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({setTasks}: AddTaskProps) {
    const [taskName, setTaskName] = useState('');
    const [author, setAuthor] = useState('');
    const [deadline, setDeadline] = useState('');

    const [taskNameError, setTaskNameError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [deadlineError, setDeadlineError] = useState(false);

    function hideError(errorFunc : React.Dispatch<React.SetStateAction<boolean>>) {
        errorFunc(false);
    }

    function validateTextInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<boolean>>) : boolean {
        if (value.trim().length == 0) {
            errorFunc(true);
            return true;
        }
        return false;
    }

    function validateDateInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<boolean>>) : boolean {
        if (!RegExp.deadline.test(value)) {
            errorFunc(true);
            return true;
        }
        return false;
    }

    async function handleAddTask() {
        const taskNameTrigger : boolean = validateTextInput(taskName, setTaskNameError); 
        const authorTrigger : boolean = validateTextInput(author, setAuthorError);
        const deadlineTrigger : boolean = validateDateInput(deadline, setDeadlineError);

        // Chciałem tutaj użyć taskNameError, authorError i deadlineError,
        // ale stan w Reacie aktualizuje się najwidoczniej asynchronicznie,
        // więc muszę to zrobić przypisując zwracaną wartość do stałych.
        // Od razu tu moje pytanie czy można to rozwiązać inaczej tak, aby
        // nie tworzyć dodatkowych zmiennych/stałych?
        if (taskNameTrigger || authorTrigger || deadlineTrigger)
            return;

        setTasks(prevTasks => [
            ...prevTasks,
            {
                title: taskName,
                author: author,
                deadline: deadline
            }
        ]);
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
                    <input onFocus={() => hideError(setTaskNameError)} onInput={inputValue => setTaskName(inputValue.currentTarget.value.trim())} className="border h-14 p-4" type="text" />
                    { taskNameError && <p>Task name is empty. Please add text</p> }
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Author</label>
                    <input onFocus={() => hideError(setAuthorError)} onInput={inputValue => setAuthor(inputValue.currentTarget.value.trim())} className="border h-14 p-4" type="text" />
                    { authorError && <p>Author is empty. Please add text</p> }
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline</label>
                    <input onFocus={() => hideError(setDeadlineError)} onInput={inputValue => setDeadline(inputValue.currentTarget.value)} className="border h-14 p-4" type="text" />
                    { deadlineError && <p>Deadline is in a wrong format (DD/MM/YYYY). Please correct</p> }
                </div>

            </form>
        </section>
    )
}