import { useState } from "react"
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"

export type Task = {
    title: string
    author: string
    deadline: string
}


const mocksTasks: Task[] = [
    {
        title: "Task 1",
        author: "Kamil",
        deadline: "18/09/2025",
    },
    {
        title: "Task 2",
        author: "Jacek",
        deadline: "24/09/2025",
    },
    {
        title: "Task 3",
        author: "Ania",
        deadline: "10/09/2025",
    },
]

function App() {
    const [tasks, setTasks] = useState(mocksTasks)


    return (
        <main className="p-4">
            <section className="flex flex-col gap-8">
                <h1 className="text-4xl font-bold">My tasks</h1>
                <AddTask setTasks={setTasks} />
                <TaskList tasks={tasks} />
            </section>
        </main>
    )
}

export default App