import {
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
  MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";

import { Task as TaskType } from "../App";
import { Dispatch, SetStateAction, useState } from "react";

type TaskProps = {
  title: string;
  author: string;
  deadline: string;
  id: string;
  setCheckedTasksId: Dispatch<SetStateAction<string[]>>;
};

export default function Task({
  title,
  author,
  deadline,
  id,
  setCheckedTasksId
}: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheck() {
    // Task 3
    isChecked ? setCheckedTasksId(prev => prev.filter(item => item !== id)) : setCheckedTasksId(prev => [...prev, id]);
    setIsChecked((prevState) => !prevState);
  }

  return (
    <div
      onClick={toggleCheck}
      className="bg-secondary rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center"
    >
      <div>
        <p>{deadline}</p>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-slate-600">{author}</p>
      </div>
      {isChecked ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
    </div>
  );
}
