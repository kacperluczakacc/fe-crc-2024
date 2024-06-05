import {
     MdCheckBoxOutlineBlank as EmptyCheckbox,
    MdOutlineCheckBox as CheckedCheckbox
 } from 'react-icons/md'
import { useState } from 'react'
import { Task as TaskType } from '../App'

export const Task = ({title,author,deadline}: TaskType) => {
    
    const [isChecked, setIsChecked] = useState(false)
    
    const handleCheckbox = () => {
        setIsChecked(prevState => !prevState)
    }

    return (
        <div className='bg-secondary my-4 p-4 text-slate-900 flex justify-between items-center transition-colors duration-500 ease-in-out' >
            <div>
                <div>{deadline}</div>
                <div className='text-xl font-bold'>{title}</div>
                <div className='text-slate-600'>{author}</div>
            </div>
            <div className='active:bg-primary rounded-md transition-colors duration-200 ease-in-out' >
            {isChecked ? <CheckedCheckbox onClick={handleCheckbox} size={24}/> : <EmptyCheckbox onClick={handleCheckbox} size={24} />}
            </div>
        </div>
    )
    }
