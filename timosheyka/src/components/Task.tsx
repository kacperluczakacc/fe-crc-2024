import {
    MdOutlineCheckBoxOutlineBlank as EmptyCheckbox,
    MdOutlineCheckBox as CheckedCheckbox,
} from "react-icons/md";
import { useReducer } from "react";

type TaskProps = {
    title: string,
    author: string,
    deadline: string,
    id: string,
    setCheckedTasksId: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Task({ title, author, deadline, id, setCheckedTasksId }: TaskProps) {    
    const [checked, dispatch] = useReducer(
        (state: { isChecked: boolean; }, action: { type: "toggle" }) => {
            return action.type === 'toggle' 
                ? { ...state, isChecked: !(state.isChecked) } 
                : state
    }, { isChecked: false })
    
    return (
        <div
            onClick={() => { 
                dispatch({ type: "toggle" });
                setCheckedTasksId(prevValue => {
                    return prevValue.includes(id) 
                        ? prevValue.filter(taskId => taskId !== id) 
                        : [...prevValue, id]
                })
            }} 
            className={`
                ${checked.isChecked 
                    ? "bg-thirdly rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center"
                    : "bg-secondary rounded-2xl shadow-md active:bg-primary my-4 p-4 flex justify-between items-center"
                }
            `}
        >    
            <div>
                <p>{deadline}</p>
                <p className="text-xl font-bold">{title}</p>
                <p className="text-slate-600">{author}</p>
            </div>
            {checked.isChecked ? <CheckedCheckbox size={24}/> : <EmptyCheckbox size={24}/>}
        </div>
    )
}
