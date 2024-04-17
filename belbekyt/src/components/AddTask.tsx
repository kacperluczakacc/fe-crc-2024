import { useRef } from "react"
import { TaskType } from "../App"

type AddTasksProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export default function AddTask({ setTasks }: AddTasksProps) {
    const taskNameRef = useRef<HTMLInputElement>(null)
    const authorRef = useRef<HTMLInputElement>(null)
    const deadlineRef = useRef<HTMLInputElement>(null)

    function handleAddTask() {
        if(taskNameRef.current && authorRef.current && deadlineRef.current){
            setTasks(prevTasks => [...prevTasks, {
                title: taskNameRef.current!.value,
                author: authorRef.current!.value,
                deadline: deadlineRef.current!.value
              }])
        }
    }
    
    return(
        <div>
            <button onClick={handleAddTask} type='button' className='border'>ADD TASK</button>
            <form className="flex flex-col gap-1 my-2">
                <label>Task name:</label>
                <input ref={taskNameRef} className="border" type="text" />
                <label>Author:</label>
                <input ref={authorRef} className="border" type="text" />
                <label>Deadline:</label>
                <input ref={deadlineRef} className="border" type="text" />
            </form>
        </div>
    )
}