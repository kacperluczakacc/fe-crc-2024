import {
    MdCheckBoxOutlineBlank as EmptyCheckBox,
    MdCheckBox as CheckedCheckbox,
} from "react-icons/md";

import { TaskType } from "../types/Task.ts";
import { useState } from "react";

function Task({ title, author, deadline }: TaskType) {
    const [isChecked, setIsChecked] = useState(false);

    function toggleCheck() {
        setIsChecked(prevState => !prevState);
    }

    return (
        <div
            onClick={toggleCheck}
            className="flex items-center justify-between p-4 m-4 active:bg-primary bg-secondary"
        >
            <div>
                <p>{deadline}</p>
                <p className="font-bold ">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckBox size={24} />}
        </div>
    );
}

export default Task;
