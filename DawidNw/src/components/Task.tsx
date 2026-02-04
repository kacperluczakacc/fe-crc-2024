import {
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
  MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";

import { useState } from "react";

type TaskProps = {
  title: string;
  author: string;
  deadline: string;
  id: string;
  addCheckedTask: (id: string) => void;
  dropCheckedTask: (id: string) => void;
};

export default function Task({
  title,
  author,
  deadline,
  id,
  addCheckedTask,
  dropCheckedTask,
}: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheck() {
    setIsChecked((prevState) => !prevState);
    if (!isChecked) addCheckedTask(id)
    if (isChecked) dropCheckedTask(id)
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
