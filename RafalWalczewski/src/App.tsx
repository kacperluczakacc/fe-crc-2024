import { useState } from "react";
import Task from "./components/Task";
import TaskList from "./components/TaskList";

type AppProps = {
  text: string;
};

export type Task = {
  title: string;
  author: string;
  deadline: string;
};

const mockTasks: Task[] = [
  {
    title: "Task 1",
    author: "Rafal",
    deadline: "18/09/2024",
  },
  {
    title: "Task 2",
    author: "Gosia",
    deadline: "18/10/2025",
  },
  {
    title: "Task 3",
    author: "Tomek",
    deadline: "18/01/2024",
  },
];

//Hooks to wbudowane funkcje, które pozwalają w prosty sposób manipulować róznymi elementami

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);

  function handleAddTask(){
    setTasks(prevTasks =>[...prevTasks, {
      title: 'Task 4',
      author: 'Natalia',
      deadline: '19/09/2024'
    }])
  }

  return (
    <main className="p-4">
      <section className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold text-center">My Tasks</h1>
          <button onClick={handleAddTask} type="button" className = "border border-solid mx-auto">ADD TASK</button>
          {tasks.map((task) =>
            <TaskList tasks={tasks}/>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
