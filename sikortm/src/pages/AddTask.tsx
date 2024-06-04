import { MdClose as CloseIcon } from 'react-icons/md'

import { useReducer, useState } from "react";
import { ROUTE } from '../lib/constants';
import { FormError, FormLabeledInput } from '../components';
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { RegExp } from '../lib/constants';
// import { useTypedDispatch } from '../store';
// import { addTask } from '../store/features/tasks/taskSlice';
import { Endpoint } from '../api/constants';

enum CustomDate {
    TODAY,
    TOMMOROW
}

export type FormInputType = 'title' | 'author' | 'deadline';

export type FormErrorType = 'empty' | 'too-short' | 'wrong-format' | '';

export function validateTextInput(type: string, value : string, errorFunc : React.Dispatch<TaskAction>) : boolean {
    if (value.trim().length == 0) {
        errorFunc({ type: type, newString: '', newError: 'empty' });
        return true;
    }
    if (value.trim().length > 0 && value.trim().length < 3) {
        errorFunc({ type: type, newString: '', newError: 'too-short' });
        return true;
    }
    errorFunc({ type: type, newString: '', newError: '' });
    return false;
}

export function validateDateInput(type: string, value : string, customDate: CustomDate | null, errorFunc : React.Dispatch<TaskAction>) : boolean {
    if (value == '' && customDate == null) {
        errorFunc({ type: type, newString: '', newError: 'empty' });
        return true;
    }
    if (RegExp.deadline.test(value) && customDate == null) {
        errorFunc({ type: type, newString: '', newError: 'wrong-format' });
        return true;
    }
    errorFunc({ type: type, newString: '', newError: '' });
    return false;
}

interface TaskState {
    taskName: string;
    author: string;
    deadline: string;
    titleError: FormErrorType;
    authorError: FormErrorType;
    deadlineError: FormErrorType;
}

export interface TaskAction {
    type: string;
    newString: string;
    newError: FormErrorType;
}

export default function AddTask() {
    // const updateStore = useTypedDispatch();

    const routerHistory = useHistory();

    const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(null);

    const taskReducer = (task: TaskState, action: TaskAction) => {
        switch(action.type) {
            case 'title': return { ...task, taskName: action.newString };
            case 'author': return { ...task, author: action.newString };
            case 'deadline': return { ...task, deadline: action.newString };
            case 'titleError': return { ...task, titleError: action.newError };
            case 'authorError': return { ...task, authorError: action.newError };
            case 'deadlineError': return { ...task, deadlineError: action.newError };
            default: return task;
        }
    }

    const [task, taskDispatch] = useReducer(taskReducer, { taskName: '', author: '', deadline: '', titleError: '', authorError: '', deadlineError: '' });

    // const [taskNameError, setTaskNameError] = useState<FormErrorType>('');
    // const [authorError, setAuthorError] = useState<FormErrorType>('');
    // const [deadlineError, setDeadlineError] = useState<FormErrorType>('');

    function handleCustomButtonClick(date: CustomDate) {
        setCustomButtonDate(prevValue => prevValue == date ? null : date);
        taskDispatch({ type: 'deadline', newString: date != null && date == CustomDate.TODAY ? dayjs().format('DD/MM/YYYY') : dayjs().add(1, 'day').format('DD/MM/YYYY'), newError: '' });
        taskDispatch({ type: 'deadlineError', newString: '', newError: '' });
    }

    const addNewTaskToServer = async () => {
        const response = await fetch(Endpoint.TASKS, {
            method: 'POST',
            body: JSON.stringify({
                title: task.taskName,
                author: task.author,
                deadline: task.deadline
            })
        });
        return response;
    }

    async function handleAddTask() {
        const taskNameTrigger = validateTextInput('titleError', task.taskName, taskDispatch); 
        const authorTrigger = validateTextInput('authorError', task.author, taskDispatch);
        const deadlineTrigger = validateDateInput('deadlineError', task.deadline, customButtonDate, taskDispatch);

        // Chciałem tutaj użyć taskNameError, authorError i deadlineError,
        // ale stan w Reacie aktualizuje się najwidoczniej asynchronicznie,
        // więc muszę to zrobić przypisując zwracaną wartość do stałych.
        // Od razu tu moje pytanie czy można to rozwiązać inaczej tak, aby
        // nie tworzyć dodatkowych zmiennych/stałych?
        if (taskNameTrigger || authorTrigger || deadlineTrigger)
            return;

        // updateStore(addTask({
        //     title: taskName,
        //     author,
        //     deadline
        // }));

        const response = await addNewTaskToServer();
        if (response.ok)
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
                    errorType={task.titleError}
                    setValue={taskDispatch}
                />

                <FormLabeledInput
                    title={'Author'}
                    type={'author'}
                    errorType={task.authorError}
                    setValue={taskDispatch}
                />
                
                <div>
                    <div className='flex gap-4'>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TODAY)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${customButtonDate == CustomDate.TODAY && 'bg-primary text-white'}`}>Today</button>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TOMMOROW)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${customButtonDate == CustomDate.TOMMOROW && 'bg-primary text-white'}`}>Tommorow</button>
                    </div>
                    <p className='my-4'>or select your date</p>
                    <DatePicker 
                        value={customButtonDate == null ? dayjs(task.deadline) : null} 
                        onChange={date => taskDispatch({ type: 'deadline', newString: date ? date?.format('DD/MM/YYYY') : '', newError: '' })} 
                        onOpen={() => {
                            setCustomButtonDate(null);
                            taskDispatch({ type: 'deadlineError', newString: '', newError: ''});
                        }}
                        format='DD/MM/YYYY' 
                    />
                    { (task.deadlineError != '') && <FormError type={'deadline'} errorType={task.deadlineError} /> }
                </div>
            </form>
        </section>
    )
}