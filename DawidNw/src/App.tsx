import { useState } from "react"
import TaskList from "./components/TaskList"
import AddNewTask from "./components/AddNewTask"

export type TaskT = {
  title: string,
  author: string,
  deadline: string,
}

const mockTasks: TaskT[] = [
  {
    title: "Task 1",
    author: "Dawid",
    deadline: "18-04-2024"
  },
  {
    title: "Task 2",
    author: "Dawid",
    deadline: "19-04-2024"
  },
  {
    title: "Task 3",
    author: "Dawid",
    deadline: "20-04-2024"
  },
]

function App() {

  const [tasks, setTasks] = useState(mockTasks) 

  return (
    <>
      <main className="p-4">
        <section className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">My tasks</h1>
          <AddNewTask setTasks={setTasks}/>
          <TaskList tasks={tasks} />
        </section>
      </main>
    </>
  )
}

export default App
