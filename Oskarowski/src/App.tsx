import { useState } from "react";
import { TaskType } from "./types/Task";
import TaskListComponent from "./components/TaskList.tsx";
import AddTaskComponent from "./components/AddTask.tsx";

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
        <main className="p-4 m-0">
            <section className="mt-2 flex flex-col">
                <h1 className="text-4xl text-center mb-3 font-bold">Tasks:</h1>
                
                <AddTaskComponent setTask={setTask} />
                <TaskListComponent tasks={tasks} />

            </section>
        </main>
    );
}

export default App;
