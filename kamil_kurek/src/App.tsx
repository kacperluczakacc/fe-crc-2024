//komponenty w react są funkcjami, które zwracają jeden element DOM

import {useState} from "react";
import TaskList from "./components/TaskList.tsx";
import AddTask from "./components/AddTask.tsx";

export type TaskType = {
  title: string;
  author: string;
  deadline: string;
}

const mockTasks: TaskType[] = [
  {
    title: "Task 1",
    author: "Kamil",
    deadline: "18/09/2025"
  },
  {
    title: "Task 2",
    author: "Kamil",
    deadline: "25/09/2025"
  },
  {
    title: "Task 3",
    author: "Kamil",
    deadline: "18/01/2025"
  },
]

//hooks to wbudowane funkcje/narzędzia pozwalająca na manipulowanie różnymi elementami/cyklami komponentów

const App = () => {
  const [tasks, setTasks] = useState(mockTasks)

  return (
      <main className="p-4">
        <section className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">My tasks</h1>
          <AddTask setTasks={setTasks}/>
          <TaskList tasks={tasks} />
        </section>
      </main>
  );
}

export default App