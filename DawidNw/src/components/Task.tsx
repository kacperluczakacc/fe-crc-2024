import { useState } from 'react';
import { TaskT } from '../App'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

export default function Task({ title, author, deadline }: TaskT) {

  const [isChecked, setIsChecked] = useState(false)

  function handleCheck() {
    setIsChecked(prevState => !prevState)
  }

  return (
    <>
        <div onClick={handleCheck} className='bg-light rounded-2xl shadow-md my-4 p-4 flex justify-between items-center active:bg-dark'>
          <div>
            <p>{deadline}</p>
            <p className='text-xl font-bold'>{title}</p>
            <p className='text-slate-600'>{author}</p>
          </div>

          {isChecked ? <MdOutlineCheckBox size={24} /> : <MdCheckBoxOutlineBlank size={24} />}
        </div>
    </>
  )
}
