import {
  MdOutlineCheckBox as CheckedCheckbox,
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
} from "react-icons/md";

import { TaskType } from "../App";
import { useState } from "react";

const Task = ({ title, author, deadline }: TaskType) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div
      onClick={toggleCheck}
      className="bg-secondary active:bg-primary rounded-2xl my-4 p-4 flex justify-between items-center"
    >
      <div>
        <p>{deadline}</p>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-slate-600">{author}</p>
      </div>
      {isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
    </div>
  );
};

export default Task;
