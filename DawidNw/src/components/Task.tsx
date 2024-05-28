import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useTypedDispatch } from '../store';
import { dropTask } from '../store/features/tasks/taskSlice';


export type TaskT = {
  title: string,
  author: string,
  deadline: Dayjs,
  keyindex: number
}

export default function Task({ title, author, deadline, keyindex }:TaskT) {

  const updateStore = useTypedDispatch()

  const [isChecked, setIsChecked] = useState(false)

  function handleCheck(index: number) {
    setIsChecked(prevState => !prevState)
    console.log(index)
    updateStore(dropTask(index))
  }

  return (
    <>
        <div onClick={() => handleCheck(keyindex)} className='bg-light rounded-2xl shadow-md my-4 p-4 flex justify-between items-center active:bg-dark'>
          <div>
            <p>{deadline.format("DD/MM/YYYY")}</p>
            <p className='text-xl font-bold'>{title}</p>
            <p className='text-slate-600'>{author}</p>
          </div>

          {isChecked ? <MdOutlineCheckBox size={24} /> : <MdCheckBoxOutlineBlank size={24} />}
        </div>
    </>
  )
}
