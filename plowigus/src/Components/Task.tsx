import {
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
  MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";

// import { useState } from "react";

type TaskProps = {
  title: string;
  author: string;
  deadline: string;
  id: string;
  isChecked: boolean;
  toggleTaskId: (id: string) => void;
};

export default function Task({
  title,
  author,
  deadline,
  id,
  isChecked,
  toggleTaskId,
}: TaskProps) {
  return (
    <div
      onClick={() => toggleTaskId(id)}
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
