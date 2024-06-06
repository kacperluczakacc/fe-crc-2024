import { MdOutlineCheckBoxOutlineBlank as EmptyCheckbox } from "react-icons/md";
import { MdOutlineCheckBox as CheckedCheckbox } from "react-icons/md";


type TaskProps = {
    title: string,
    author: string,
    deadline: string,
    id: string,
    isSelected: boolean,
    setCheckedTaskId: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Task({
    title,
    author,
    deadline,
    id,
    isSelected,
    setCheckedTaskId,
}: TaskProps) {

    function toggleCheck() {
        setCheckedTaskId((prevIds) => 
            prevIds.includes(id) ? prevIds.filter(taskId => taskId !== id) : [...prevIds, id]
        );
    }

    return (
        <div onClick={toggleCheck} className={`bg-secondary rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center cursor-pointer ${isSelected ? 'bg-selected' : ''}`}>
            <div>
                <p>{deadline}</p>
                <p className="text-xl font-bold">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {isSelected ? <CheckedCheckbox size={24} /> : <EmptyCheckbox size={24} />}
        </div>
    );
}
