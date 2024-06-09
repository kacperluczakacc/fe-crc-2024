import { MdClose as CloseIcon } from 'react-icons/md'
import { useReducer } from "react";
import { ROUTE } from '../lib/constants';
import { FormError, FormLabeledInput } from '../components';
import { Link, useHistory } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Endpoint } from '../api/constants';

enum CustomDate {
    TODAY,
    TOMMOROW
}

export type FormInputType = 'title' | 'author' | 'deadline';

export type FormErrorType = 'empty' | 'too-short' | '';

export function validateTextInput(value: string, errorFunc: React.Dispatch<React.SetStateAction<FormErrorType>>): boolean {
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

export function validateDateInput(value: Dayjs | null, customDate: CustomDate | null, errorFunc: React.Dispatch<React.SetStateAction<FormErrorType>>): boolean {
    if (value == null && customDate == null) {
        errorFunc('empty');
        return true;
    }
    errorFunc('');
    return false;
}

type State = {
    customButtonDate: CustomDate | null;
    taskName: string;
    author: string;
    deadline: Dayjs | null;
    taskNameError: FormErrorType;
    authorError: FormErrorType;
    deadlineError: FormErrorType;
};

type Action =
    | { type: 'SET_CUSTOM_BUTTON_DATE'; payload: CustomDate | null }
    | { type: 'SET_TASK_NAME'; payload: string }
    | { type: 'SET_AUTHOR'; payload: string }
    | { type: 'SET_DEADLINE'; payload: Dayjs | null }
    | { type: 'SET_TASK_NAME_ERROR'; payload: FormErrorType }
    | { type: 'SET_AUTHOR_ERROR'; payload: FormErrorType }
    | { type: 'SET_DEADLINE_ERROR'; payload: FormErrorType };

const initialState: State = {
    customButtonDate: null,
    taskName: '',
    author: '',
    deadline: null,
    taskNameError: '',
    authorError: '',
    deadlineError: ''
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CUSTOM_BUTTON_DATE':
            return { ...state, customButtonDate: action.payload };
        case 'SET_TASK_NAME':
            return { ...state, taskName: action.payload };
        case 'SET_AUTHOR':
            return { ...state, author: action.payload };
        case 'SET_DEADLINE':
            return { ...state, deadline: action.payload };
        case 'SET_TASK_NAME_ERROR':
            return { ...state, taskNameError: action.payload };
        case 'SET_AUTHOR_ERROR':
            return { ...state, authorError: action.payload };
        case 'SET_DEADLINE_ERROR':
            return { ...state, deadlineError: action.payload };
        default:
            return state;
    }
}

export default function AddTask() {
    const routerHistory = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleCustomButtonClick(date: CustomDate) {
        dispatch({ type: 'SET_CUSTOM_BUTTON_DATE', payload: state.customButtonDate == date ? null : date });
        dispatch({ type: 'SET_DEADLINE', payload: date != null && date == CustomDate.TODAY ? dayjs() : dayjs().add(1, 'day') });
    }

    const addNewTaskToServer = async () => {
        const response = await fetch(Endpoint.TASKS, {
            method: 'POST',
            body: JSON.stringify({
                title: state.taskName,
                author: state.author,
                deadline: state.deadline?.toString()
            })
        });
        return response;
    }

    async function handleAddTask() {
        const taskNameTrigger = validateTextInput(state.taskName, error => dispatch({ type: 'SET_TASK_NAME_ERROR', payload: error }));
        const authorTrigger = validateTextInput(state.author, error => dispatch({ type: 'SET_AUTHOR_ERROR', payload: error }));
        const deadlineTrigger = validateDateInput(state.deadline, state.customButtonDate, error => dispatch({ type: 'SET_DEADLINE_ERROR', payload: error }));
        if (taskNameTrigger || authorTrigger || deadlineTrigger)
            return;
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
                    errorType={state.taskNameError}
                    setError={error => dispatch({ type: 'SET_TASK_NAME_ERROR', payload: error })}
                    setValue={value => dispatch({ type: 'SET_TASK_NAME', payload: value })}
                />
                <FormLabeledInput
                    title={'Author'}
                    type={'author'}
                    errorType={state.authorError}
                    setError={error => dispatch({ type: 'SET_AUTHOR_ERROR', payload: error })}
                    setValue={value => dispatch({ type: 'SET_AUTHOR', payload: value })}
                />
                <div>
                    <div className='flex gap-4'>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TODAY)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${state.customButtonDate == CustomDate.TODAY && 'bg-primary text-white'}`}>Today</button>
                        <button type='button' onClick={() => handleCustomButtonClick(CustomDate.TOMMOROW)} className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white transition ${state.customButtonDate == CustomDate.TOMMOROW && 'bg-primary text-white'}`}>Tommorow</button>
                    </div>
                    <p className='my-4'>or select your date</p>
                    <DatePicker
                        value={state.customButtonDate == null ? state.deadline : null}
                        onChange={date => dispatch({ type: 'SET_DEADLINE', payload: date })}
                        onOpen={() => {
                            dispatch({ type: 'SET_CUSTOM_BUTTON_DATE', payload: null });
                            dispatch({ type: 'SET_DEADLINE_ERROR', payload: '' });
                        }}
                        format='DD/MM/YYYY'
                        className='text-white' />
                    {state.deadlineError != '' && <FormError type={'deadline'} errorType={state.deadlineError} />}
                </div>
            </form>
        </section>
    );
}
