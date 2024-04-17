import { useState } from "react"
import Task from "./components/Task"
export type Task = {
  title: string,
  author: string,
  deadline: string
}

const mockTasks: Task[] = [
  {
    title: "Task 1",
    author: "Wojtek",
    deadline: "18/09/2015"
  },
  {
    title: "Task 2",
    author: "Paul",
    deadline: "12/01/2018"
  },
  {
    title: "Task 3",
    author: "Viki",
    deadline: "06/09/2013"
  }
]



function App() {
 const [tasks, setTasks] = useState(mockTasks)

function handleAddTask() {
  setTasks(prevTasks => {
    return [...prevTasks, {
      title: 'Task 4',
      author: 'Natalia',
      deadline: '19/09/2024'
    }]
  })
}
  return (
    <>
    <main className="p-4">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">My tasks</h1>
        <button onClick={handleAddTask } type="button" className="border">ADD TASK</button>
        {tasks.map(task=> <Task key={task.title.replace(/ /g,'-')} title={task.title} author={task.author} deadline={task.deadline}/>)}
      </section>
     
    </main>

    </>
  )
}

export default App
