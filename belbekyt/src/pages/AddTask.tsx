import { useEffect, useRef, useState } from "react"
import { TaskType } from "../App"

import { MdClose as CloseIcon} from "react-icons/md"
import { RegExp } from "../lib/constants"

type AddTasksProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export default function AddTask({ setTasks }: AddTasksProps) {
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');

    const [taskNameError, setTaskNameError] = useState(false);
    const [deadlineError, setDeadlineError] = useState(false);

    function hideTaskNameError(){
        setTaskNameError(false)
    }

    function hideDeadlineError(){
        setDeadlineError(false)
    }

    useEffect(() => {
        setTaskNameError(taskName.length === 1);
        setDeadlineError(RegExp.deadline.test(deadline));
    }, [taskName, deadline])

    function handleAddTask() {

    }
    
    return(
        <section>
            <div className="flex justify-between items-center p-4">
                <CloseIcon size={24}/>
                <h1 className="text-xl">Create new task</h1>
                <button onClick={handleAddTask} className="text-primary font-bold">Save</button>
            </div>
            <form className="flex flex-col gap-10 my-6 px-5">
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Task name:</label>
                    <input onFocus={hideTaskNameError} onInput={(input) => setTaskName(input.currentTarget.value)} className="border h-14 p-4" type="text" />
                    {taskNameError && <p>Task name is empty. Pleas add text.</p>}
                </div>
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Author:</label>
                    <input className="border h-14 p-4" type="text" />
                </div>
                <div className="flex flex-col relative">
                    <label className="absolute -top-3 left-2 bg-secondary px-2">Deadline:</label>
                    <input onFocus={hideDeadlineError} onInput={(input) => setDeadline(input.currentTarget.value)} className="border h-14 p-4" type="text" />
                    {deadlineError && <p>Deadline is in a wrong format (DD/MM/YYYY)</p>}
                </div>
            </form> 
        </section>
    )
}