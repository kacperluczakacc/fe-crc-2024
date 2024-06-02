import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

import { useState } from "react";
type TaskProps = {
  title: string;
  author: string;
  deadline: string;
  id: string;
  setCheckedTaskId: React.Dispatch<React.SetStateAction<string>>;
};
function Task({ title, author, deadline, id, setCheckedTaskId }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function toggleCheck() {
    setCheckedTaskId((prevValue) => (prevValue === id ? "" : id));
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
      {isChecked ? <MdOutlineCheckBox size={24} /> : <MdOutlineCheckBoxOutlineBlank size={24} />}
    </div>
  );
}
export default Task;
