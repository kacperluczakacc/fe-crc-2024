import { MdClose as CloseIcon } from 'react-icons/md'

import { useState } from "react";
import { Task } from "../App"
import { RegExp, ROUTE } from '../lib/constans';
import { FormError } from '../components';
import { Link, useHistory } from "react-router-dom";

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({setTasks}: AddTaskProps) {
    const routerHistory = useHistory();

    const [taskName, setTaskName] = useState('');
    const [author, setAuthor] = useState('');
    const [deadline, setDeadline] = useState('');

    const [taskNameError, setTaskNameError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [deadlineError, setDeadlineError] = useState('');

    // Funkcja raczej nadająca się do helpera

    function hideError(errorFunc : React.Dispatch<React.SetStateAction<string>>) {
        errorFunc('');
    }

    function validateTextInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<string>>) : boolean {
        if (value.trim().length == 0) {
            errorFunc('empty');
            return true;
        }
        if (value.trim().length < 3) {
            errorFunc('too-short');
            return true;
        }
        return false;
    }

    function validateDateInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<string>>) : boolean {
        if (value.trim().length == 0) {
            errorFunc('empty');
            return true;
        }
        if (!RegExp.deadline.test(value)) {
            errorFunc('wrong-format');
            return true;
        }
        return false;
    }

    function handleAddTask() {
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
        routerHistory.push(ROUTE.HOME);
    }

    return (
        <section>
            <div className='flex justify-between items-center p-4'>
                <Link to={ROUTE.HOME}><CloseIcon size={24} /></Link>
                <h1 className='text-xl'>Create new task</h1>
                <button onClick={handleAddTask} className='text-primary font-bold'>Save</button>
            </div>
            <form className="flex flex-col gap-10 my-4 px-5">

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Task Name</label>
                    {
                        // Ciekawe jest również to, że zastosowanie
                        // taskNameError != '' && ' border-red-700'
                        // powoduje, że nie wczytuje mi się p-4 i muszę zrobić albo
                        // taskNameError != '' ? ' border-red-700' : ''
                        // albo dodać spację na końcu dotyczasowego className
                    }
                    <input onFocus={() => hideError(setTaskNameError)} onInput={inputValue => setTaskName(inputValue.currentTarget.value.trim())} className={'border h-14 p-4 ' + (taskNameError != '' && 'border-red-700')} type="text" />
                    { taskNameError == 'empty' ? <FormError title={'Title is required'}/> : taskNameError == 'too-short' && <FormError title={'Title should be at least 3 characters'}/> }
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Author</label>
                    <input onFocus={() => hideError(setAuthorError)} onInput={inputValue => setAuthor(inputValue.currentTarget.value.trim())} className={'border h-14 p-4 ' + (taskNameError != '' && 'border-red-700')} type="text" />
                    { authorError == 'empty' ? <FormError title={'Author is required'}/> : authorError == 'too-short' && <FormError title={'Author should be at least 3 characters'}/> }
                </div>

                <div className='flex flex-col relative'>
                    <label className='absolute -top-3 left-2 bg-secondary px-2'>Deadline</label>
                    <input onFocus={() => hideError(setDeadlineError)} onInput={inputValue => setDeadline(inputValue.currentTarget.value)} className={'border h-14 p-4 ' + (taskNameError != '' && 'border-red-700')} type="text" />
                    { deadlineError == 'empty' ? <FormError title={'Deadline is required'}/> : deadlineError == 'wrong-format' && <FormError title={'Deadline should be of DD/MM/YYYY format'} /> }
                </div>

            </form>
        </section>
    )
}