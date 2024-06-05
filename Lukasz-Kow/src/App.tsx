import { AddTask, TaskList } from "./pages"
import { Route, Switch } from "react-router-dom"
import { ROUTE } from "./lib/constants"
import Header from "./components/Header"

export type Task = {
    [x: string]: string
    title: string
    author: string
    deadline: string
}

async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks')
    const data = await response.json()
}

async function addNewTask() {
    const response = await fetch('http://localhost:3000/tasks', {
        method: "POST",
        body: JSON.stringify({
            "title": "New Task",
            "author": "Lukasz Zajac",
            "deadline": "19/11/2026",
            "priority": "Low",
            "status": "Planning",
            "additionalInfo": "tests"
        })
    })

    if (response.status === 201) {
        console.log("new task added")
    } else {
        console.error("new task not added")
    }
}

async function updateTask(id: string) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: "Updated task no. 4",
        }),
    });
    console.log(response);
}



function App() {



    return (
        <>
            <Header />
            <Switch>
                <Route path={ROUTE.ADD_TASKS}>
                    <AddTask />
                </Route>
                <Route path={ROUTE.HOME}>
                    <TaskList />
                </Route>
            </Switch>
        </>
    )
}

export default App