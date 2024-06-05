import { MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,  MdOutlineCheckBox as CheckedCheckBox } from "react-icons/md";
import { Task as TaskType } from "../App";
import { useState } from "react";

export default function Task({ title, author, deadline }: TaskType) {
    const [isChecked, setIsChekced] = useState(false);
    
    function toggleCheck() {
        setIsChekced(prevState => !prevState)
    }

    return (
        <div onClick={toggleCheck} className="bg-secondary rounded-2xl shadow-2md active:bg-primary my-4 p-4 flex justify-between">
            <div>
                <p>{deadline}</p>
                <p className="text-xl font-bold">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {isChecked ? <CheckedCheckBox size={24} /> : <EmptyCheckbox size={24} />}
        </div>
    )
}
