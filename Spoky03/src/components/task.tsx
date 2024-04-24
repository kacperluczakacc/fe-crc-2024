import { Task as TaskType } from '../App'


export const Task = ({title,author,deadline}: TaskType) => {
    return (
        <div className='bg-slate-800 text-slate-100 text-center p-1'>
            <div>{title}</div>
            <div>{author}</div>
            <div>{deadline}</div>
        </div>
    )
    }
