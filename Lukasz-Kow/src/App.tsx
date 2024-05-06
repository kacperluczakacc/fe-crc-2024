import { useState } from "react"

import { AddTask, TaskList } from "./pages"

import { Route, Switch } from "react-router-dom"
import { ROUTE } from "./lib/constants"
import Header from "./components/Header"

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
        <>

            <Header />
            <Switch>
                <Route path={ROUTE.ADD_TASKS}>
                    <AddTask setTasks={setTasks} />
                </Route>
                <Route path={ROUTE.HOME}>
                    <TaskList tasks={tasks} />
                </Route>
            </Switch>
        </>
    )
}

export default App