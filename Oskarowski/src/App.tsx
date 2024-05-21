import { useState } from "react";
import { TaskType } from "./types/Task";

import {AddTask, TaskList} from "./pages";
import { Header } from "./components/Header.tsx";

import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/routes.ts";

const mockTasks: TaskType[] = [
    {
        title: "Task 1",
        author: "Jeremi",
        deadline: "2024-12-31",
    },
    {
        title: "Task 2",
        author: "Tomasz",
        deadline: "2025-6-31",
    },
    {
        title: "Task 3",
        author: "Marcin",
        deadline: "2024-5-15",
    },
];

function App() {
    const [tasks, setTask] = useState(mockTasks);

    return (
        <>
            <Header></Header>
            <h1 className="mb-3 text-4xl font-bold text-center bg-secondary">Tasks:</h1>
            <Switch>
                <Route path={ROUTE.HOME}>
                    <TaskList tasks={tasks}></TaskList>
                </Route>
                <Route path="/add-task">
                    <AddTask setTask={setTask}></AddTask>
                </Route>
            </Switch>
        </>
    );
}

export default App;
