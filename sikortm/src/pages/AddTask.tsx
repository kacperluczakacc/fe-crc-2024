import { MdClose as CloseIcon } from 'react-icons/md'

import { useState } from "react";
import { Task } from "../App"
import { RegExp, ROUTE } from '../lib/constans';
import { FormLabeledInput } from '../components';
import { Link, useHistory } from "react-router-dom";

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export type FormInputType = 'title' | 'author' | 'deadline';

export type FormErrorType = 'empty' | 'too-short' | 'wrong-format' | '';

export default function AddTask({setTasks}: AddTaskProps) {
    const routerHistory = useHistory();

    const [taskName, setTaskName] = useState('');
    const [author, setAuthor] = useState('');
    const [deadline, setDeadline] = useState('');

    const [taskNameError, setTaskNameError] = useState<FormErrorType>('');
    const [authorError, setAuthorError] = useState<FormErrorType>('');
    const [deadlineError, setDeadlineError] = useState<FormErrorType>('');

    function validateTextInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<FormErrorType>>) : boolean {
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

    function validateDateInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<FormErrorType>>) : boolean {
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
        const taskNameTrigger = validateTextInput(taskName, setTaskNameError); 
        const authorTrigger = validateTextInput(author, setAuthorError);
        const deadlineTrigger = validateDateInput(deadline, setDeadlineError);

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

                <FormLabeledInput
                    title={'Title'}
                    type={'title'}
                    errorType={taskNameError}
                    setError={setTaskNameError}
                    setValue={setTaskName}
                />

                <FormLabeledInput
                    title={'Author'}
                    type={'author'}
                    errorType={authorError}
                    setError={setAuthorError}
                    setValue={setAuthor}
                />

                <FormLabeledInput
                    title={'Deadline'}
                    type={'deadline'}
                    errorType={deadlineError}
                    setError={setDeadlineError}
                    setValue={setDeadline}
                />

            </form>
        </section>
    )
}