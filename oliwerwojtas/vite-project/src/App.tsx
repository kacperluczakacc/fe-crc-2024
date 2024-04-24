import { useState } from "react";
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

export type Task = {
  title: string;
  author: string;
  deadline: string;
};

const mockTasks: Task[] = [
  {
    title: "Task 1",
    author: "Oliwer",
    deadline: "18/09/2024",
  },
  {
    title: "Task 2",
    author: "Wiktoria",
    deadline: "22/10/2025",
  },
  {
    title: "Task 3",
    author: "Andrzej",
    deadline: "8/01/2026",
  },
];

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <main className="p-4">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <AddTask setTasks={setTasks} />
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
};

export default App;
