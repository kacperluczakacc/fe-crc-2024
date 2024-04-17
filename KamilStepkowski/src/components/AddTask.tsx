import { useRef, useState } from "react"
import { Task } from "../App"

type AddTaskProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({setTasks}: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [deadline, setDeadline] = useState('');

  const taskNameRef = useRef<HTMLInputElement>(null);
  const taskAuthor = useRef<HTMLInputElement>(null);
  const taskDeadline = useRef<HTMLInputElement>(null);

  function handleAddTask() {

    setTasks(prev => [
      ...prev,
      {
        title: taskNameRef.current?.value || '',
        author: taskAuthor.current?.value || '',
        deadline: taskDeadline.current?.value || '',
      },
    ])
  }

  return (
        <><button type="button" className="border" onClick={handleAddTask}>
      ADD TASK
    </button>
    <form className="flex flex-col gap-1 my-2">
        <label>Task name:</label>
        {/* onInput={(inputVal) => setTitle(inputVal.currentTarget.value)} */}
        <input className="border" type="text" ref={taskNameRef}/>
        <label>Author:</label>
        <input className="border" type="text" ref={taskAuthor} />
        <label>Deadline:</label>
        <input className="border" type="text" ref={taskDeadline} />
      </form></>
  )
}