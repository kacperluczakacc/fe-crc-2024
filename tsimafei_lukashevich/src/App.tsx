/* eslint-disable @typescript-eslint/no-unused-vars */
import Task from "./components/Task";
import { AddTask, TaskList } from './pages';

import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import Header from "./components/Header";

export type Task = { title: string, author: string, deadline: string, id: string }

const App = () => {

    async function getTask() {
        const response = await fetch('http://localhost:3000/tasks')
        const data = await response.json()
        console.log(data);
    }

    async function addNewTask() {
        const response = await fetch('http://localhost:3000/tasks', {
            method: "POST",
            body: JSON.stringify({
                title: "New JSON task",
                author: "King",
                deadline: "19/04/2021"
            })
        })
        const data = await response.json()
        console.log(data);
    }

    async function updateTask(id: string) {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({ id: id })
        })
        const data = await response.json()
        console.log(data);
    }

    return (
        <>
            <Header />
            <Switch>
                <Route path={ROUTE.ADD_TASK}>
                    <AddTask/>
                </Route>
                <Route path={ROUTE.HOME}>
                    <TaskList/>
                </Route>
            </Switch>
        </>
    )
}

export default App