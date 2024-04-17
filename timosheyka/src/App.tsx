import { useState } from "react";
import Task from "./components/Task";

export type TaskType = {
  title: string,
  author: string,
  deadline: string
}

const mockTasks: TaskType[] = [
  {
    title: "Task 1",
    author: "Tim",
    deadline: "18/09/2025"
  },
  {
    title: "Task 2",
    author: "Sam",
    deadline: "18/09/2024"
  },
  {
    title: "Task 3",
    author: "Nick",
    deadline: "18/01/2025"
  }
];

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);

  function handleAddTask() {
    setTasks(prevTasks => [...prevTasks, {
      title: "Task 4",
      author: "Nathan",
      deadline: "19/09/2024"
    }])
  }

  return (
    <main className="p-4">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <button onClick={handleAddTask} type="button" className="border border-solid">ADD TASK</button>
        {tasks.map(task => 
          <Task
            key={task.title.replace(/ /g, '-')}
            title={task.title}
            author={task.author}
            deadline={task.deadline}
          />)
        }
      </section>
    </main>
  );
};

export default App
