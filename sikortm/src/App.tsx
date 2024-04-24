// Komponenty w React.js są funkcjami, które zwracają jeden element DOM
// Składnia React.js jest JSX
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { useState } from "react";
import Task from "./components/Task.tsx";
import TaskList from "./components/TaskList.tsx";
import AddTask from "./components/AddTask.tsx";

export type Task = {
  title: string;
  author: string;
  deadline: string;
}

// Coming from server
const mockTasks: Task[] = [
  {
    title: 'Task 1',
    author: 'Jakub',
    deadline: '18/09/2024'  
  },
  {
    title: 'Task 2',
    author: 'Wiktoria',
    deadline: '21/09/2024'  
  },
  {
    title: 'Task 3',
    author: 'Mateusz',
    deadline: '19/09/2024'  
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