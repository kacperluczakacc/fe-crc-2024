import {
  MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
  MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";

type TaskProps = {
    title: string;
    author: string;
    deadline: string;
    id: string;
    isChecked: boolean;
    setCheckedTaskId: (id: string) => void;
};

function Task({ title, author, deadline, id, isChecked, setCheckedTaskId }: TaskProps) {
    
    function toggleCheck() {
        setCheckedTaskId(id);
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
