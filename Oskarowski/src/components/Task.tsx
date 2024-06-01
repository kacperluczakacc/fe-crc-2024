import {
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
  MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";

import { useEffect, useState } from "react";

type TaskProps = {
    title: string;
    author: string;
    deadline: string;
    id: string;
    setCheckedTaskId: React.Dispatch<React.SetStateAction<string>>;
};

function Task({ title, author, deadline, id, setCheckedTaskId }: TaskProps) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        console.log("isChecked state updated to:", isChecked);
    }, [isChecked]);

    function toggleCheck() {
        setCheckedTaskId((prevValue) => (prevValue === id ? "" : id));
        setIsChecked((prevState) => !prevState);
    }

    return (
        <div
            onClick={toggleCheck}
            className="flex items-center justify-between p-4 m-4 active:bg-primary bg-secondary"
        >
            <div>
                <p>{deadline}</p>
                <p className="font-bold">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {isChecked ? (
                <CheckedCheckbox size={24} />
            ) : (
                <EmptyCheckbox size={24} />
            )}
        </div>
    );
}

export default Task;
