import { useState } from "react"

import { AddTask, TaskList } from "./pages"

import { Route, Switch } from "react-router-dom"
import { ROUTE } from "./lib/constants"
import Header from "./components/Header"
import dayjs, { Dayjs } from "dayjs"

export type Task = {
    title: string
    author: string
    deadline: string
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