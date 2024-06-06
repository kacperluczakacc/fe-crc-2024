// Komponenty w React.js są funkcjami, które zwracają JEDEN element DOM.
// Składnią React.js jest JSX.
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { useState } from "react";
import Task from "./components/Task";

import { AddTask, TaskList } from './pages';

import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import Header from "./components/Header";

export type Task = {
    title: string;
    author: string;
    deadline: string;
}

// Hooks to wbudowane funkcje/narzędzia, które pozwalają nam w prosty sposób manipulować
// różnymi elementami/cyklami komponentów w React.js

const App = () => {
    return (
        <>  
            <Header />
            <Switch>
                <Route path={ROUTE.ADD_TASK}>
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
