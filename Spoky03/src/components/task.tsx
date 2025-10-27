import {
     MdCheckBoxOutlineBlank as EmptyCheckbox,
    MdOutlineCheckBox as CheckedCheckbox
 } from 'react-icons/md'
import { Task as TaskType } from '../App'
import dayjs from 'dayjs'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { markTaskToDelete } from '../reducers/taskDeleteReducer'

export const Task = ({title,author,deadline, id}: TaskType) => {
    
    const isChecked = useSelector((state:RootState) => state.tasksToDelete.includes(id))
    const dispatch = useDispatch<AppDispatch>()
    const handleCheckbox = () => {
        dispatch(markTaskToDelete(id))
    }
    
    return (
        <div className='bg-secondary p-4 border-b border-slate-500 text-slate-900 flex justify-between items-center transition-colors duration-500 ease-in-out' >
            <div>
                <div>{dayjs(deadline).format('DD/MM/YYYY')}</div>
                <div className='text-xl font-bold'>{title}</div>
                <div className='text-slate-600'>{author}</div>
            </div>
            <div className='active:bg-primary rounded-md transition-colors duration-200 ease-in-out' >
            {isChecked ? <CheckedCheckbox onClick={handleCheckbox} size={24}/> : <EmptyCheckbox onClick={handleCheckbox} size={24} />}
            </div>
        </div>
    )
    }
