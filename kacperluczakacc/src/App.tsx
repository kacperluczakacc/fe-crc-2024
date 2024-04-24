// Komponenty w React.js są funkcjami, które zwracają JEDEN element DOM.
// Składnią React.js jest JSX.
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { useState } from "react";
import Task from "./components/Task";

import { AddTask, TaskList } from './pages';

import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import Header from "./components/Header";
import { sortByNewest } from "./lib/helpers/dates";

export type Task = {
    title: string;
    author: string;
    deadline: string;
}

// "Coming from server"
const mockTasks: Task[] = [
    {
        title: "Task 1",
        author: "Kacper",
        deadline: "18/09/2025"
    },
    {
        title: "Task 2",
        author: "Tomek",
        deadline: "18/09/2024"
    },
    {
        title: "Task 3",
        author: "Gosia",
        deadline: "18/01/2025"
    }
];

// Hooks to wbudowane funkcje/narzędzia, które pozwalają nam w prosty sposób manipulować
// różnymi elementami/cyklami komponentów w React.js

const App = () => {
    const [tasks, setTasks] = useState(mockTasks);

    return (
        <>  
            <Header />
            <Switch>
                <Route path={ROUTE.ADD_TASK}>
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
