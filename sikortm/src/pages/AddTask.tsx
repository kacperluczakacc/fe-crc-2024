import { MdClose as CloseIcon } from 'react-icons/md'

import { useState } from "react";
import { ROUTE } from '../lib/constans';
import { FormError, FormLabeledInput } from '../components';
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useTypedDispatch } from '../store';
import { addTask } from '../store/features/tasks/taskSlice';

enum CustomDate {
    TODAY,
    TOMMOROW
}

export type FormInputType = 'title' | 'author' | 'deadline';

export type FormErrorType = 'empty' | 'too-short' | '';

export function validateTextInput(value : string, errorFunc : React.Dispatch<React.SetStateAction<FormErrorType>>) : boolean {
    if (value.trim().length == 0) {
        errorFunc('empty');
        return true;
    }
    if (value.trim().length > 0 && value.trim().length < 3) {
        errorFunc('too-short');
        return true;
    }
    errorFunc('');
    return false;
}

export function validateDateInput(value : Dayjs | null, customDate: CustomDate | null, errorFunc : React.Dispatch<React.SetStateAction<FormErrorType>>) : boolean {

    if (value == null && customDate == null) {
        errorFunc('empty');
        return true;
    }
    errorFunc('');
    return false;
}

export default function AddTask() {
    const updateStore = useTypedDispatch();

    const routerHistory = useHistory();

    const [customButtonDate, setCustomButtonDate] = useState<CustomDate | null>(null);

    const [taskName, setTaskName] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [deadline, setDeadline] = useState<Dayjs | null>(null);

    const [taskNameError, setTaskNameError] = useState<FormErrorType>('');
    const [authorError, setAuthorError] = useState<FormErrorType>('');
    const [deadlineError, setDeadlineError] = useState<FormErrorType>('');

    function handleCustomButtonClick(date: CustomDate) {
        setCustomButtonDate(prevValue => prevValue == date ? null : date);
        setDeadline(date != null && date == CustomDate.TODAY ? dayjs() : dayjs().add(1, 'day'));
    }

    function handleAddTask() {
        const taskNameTrigger = validateTextInput(taskName, setTaskNameError); 
        const authorTrigger = validateTextInput(author, setAuthorError);
        const deadlineTrigger = validateDateInput(deadline, customButtonDate, setDeadlineError);

        // Chciałem tutaj użyć taskNameError, authorError i deadlineError,
        // ale stan w Reacie aktualizuje się najwidoczniej asynchronicznie,
        // więc muszę to zrobić przypisując zwracaną wartość do stałych.
        // Od razu tu moje pytanie czy można to rozwiązać inaczej tak, aby
        // nie tworzyć dodatkowych zmiennych/stałych?
        if (taskNameTrigger || authorTrigger || deadlineTrigger)
            return;

        updateStore(addTask({
            title: taskName,
            author,
            deadline
        }));

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
                
                <div>
                    <div className='flex gap-4'>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TODAY)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${customButtonDate == CustomDate.TODAY && 'bg-primary text-white'}`}>Today</button>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TOMMOROW)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${customButtonDate == CustomDate.TOMMOROW && 'bg-primary text-white'}`}>Tommorow</button>
                    </div>
                    <p className='my-4'>or select your date</p>
                    <DatePicker 
                    value={customButtonDate == null ? deadline : null} 
                    onChange={date => setDeadline(date)} 
                    onOpen={() => {
                        setCustomButtonDate(null);
                        setDeadlineError('');
                    }}
                    format='DD/MM/YYYY'
                    className='text-white'/>
                    { (deadlineError != '') && <FormError type={'deadline'} errorType={deadlineError} /> }
                </div>
            </form>
        </section>
    )
}