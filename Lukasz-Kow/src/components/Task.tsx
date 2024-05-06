import { MdCheckBoxOutlineBlank as EmptyCheckBox, MdOutlineCheckBox as CheckedCheckBox } from "react-icons/md";

import { Task as TaskType } from "../App";
import { useState } from "react";

function Task({ title, author, deadline }: TaskType) {
    const [isCkecked, setIsChecked] = useState(false);

    function toggleCheck() {
        setIsChecked(prevState => !prevState)
    }

    return (
        <div onClick={toggleCheck} className="bg-secoundary rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center">
            <div>
                <p>{deadline}</p>
                <p className="text-xl font-bold ">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {isCkecked ? <CheckedCheckBox size={24} /> : <EmptyCheckBox size={24} />}
        </div>
    )
}

export default Task;