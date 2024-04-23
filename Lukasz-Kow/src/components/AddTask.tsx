import { useRef, useState } from "react"
import { Task } from "../App"

type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({ setTasks }: AddTaskProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [deadline, setDeadline] = useState('');

    const taskNameRef = useRef<HTMLInputElement>(null);
    const taskAuthorRef = useRef<HTMLInputElement>(null);
    const taskDeadlineRef = useRef<HTMLInputElement>(null);

    function handleAddTask() {

        setTasks(prevTask => [
            ...prevTask,
            {
                title: taskNameRef.current?.value || '',
                author: taskAuthorRef.current?.value || '',
                deadline: taskDeadlineRef.current?.value || '',
            },
        ])
    }

    return (
        <><button type="button" className="border" onClick={handleAddTask}>
            ADD TASK
        </button>
            <form className="flex flex-col gap-1 my-2">
                <label>Task name:</label>
                <input className="border" type="text" ref={taskNameRef} />
                <label>Author:</label>
                <input className="border" type="text" ref={taskAuthorRef} />
                <label>Deadline:</label>
                <input className="border" type="text" ref={taskDeadlineRef} />
            </form></>
    )
}