// Komponenty w React.js są funkcjami, które zwracają JEDEN element DOM.
// Składnią React.js jest JSX.
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { useState } from "react";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

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
