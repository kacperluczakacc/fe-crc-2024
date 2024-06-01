import { TaskType } from "./types/Task";

import { AddTask, TaskList } from "./pages";
import { Header } from "./components/Header.tsx";

import { Route, Switch, useHistory } from "react-router-dom";
import { ROUTE } from "./lib/routes.ts";
import { useEffect } from "react";

async function getTasks() {
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    console.log(data);
}

async function addNewTask() {
    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
            title: "New task no. 4",
            author: "Kacper",
            deadline: "19/09/2025",
        }),
    });
}

async function updateTask(id: string) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT", // aktualizacja danych dla elementu w bazie danych reprezentowanych przed podany ID
        body: JSON.stringify({
            title: "Updated task no. 4",
        }),
    });
}

function App() {
    const history = useHistory();

    useEffect(() => {
        // Automatically navigate to /home when the app loads
        history.push(ROUTE.HOME);
    }, [history]);

    return (
        <>
            <Header></Header>
            <h1 className="mb-3 text-4xl font-bold text-center bg-secondary">
                Tasks:
            </h1>
            <Switch>
                <Route path={ROUTE.HOME}>
                    <TaskList></TaskList>
                </Route>
                <Route path="/add-task">
                    <AddTask></AddTask>
                </Route>
            </Switch>
        </>
    );
}

export default App;
