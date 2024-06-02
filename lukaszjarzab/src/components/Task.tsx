import {
  MdOutlineCheckBox as CheckedCheckbox,
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
} from "react-icons/md";

import { useState } from "react";

type TaskProps = {
  title: string;
  author: string;
  deadline: string;
  id: string;
  setCheckedTaskIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const Task = ({
  title,
  author,
  deadline,
  id,
  setCheckedTaskIds,
}: TaskProps) => {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheck() {
    setCheckedTaskIds((prevValue) => {
      const valExist = prevValue.filter((i) => i === id);
      if (valExist.length !== 0) {
        return prevValue.filter((i) => i !== id);
      } else {
        return [...prevValue, id];
      }
    });
    //(prevValue === id ? "" : id));
    setIsChecked((prevState) => !prevState);
  }

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
