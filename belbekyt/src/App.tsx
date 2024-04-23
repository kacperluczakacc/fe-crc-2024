import { useState } from 'react'
import Task from "./components/Task.tsx";
import TaskList from './components/TaskList.tsx';
import AddTask from './components/AddTask.tsx';

export type TaskType = {
  title: string;
  author: string;
  deadline: string;
}


const mockTasks: TaskType[] = [
  {
    title: 'Task 1',
    author: 'Miłosz',
    deadline: '18/09/2025'
  },
  {
    title: 'Task 2',
    author: 'Rafał',
    deadline: '18/09/2024'
  },
  {
    title: 'Task 3',
    author: 'gosia',
    deadline: '18/01/2025'
  }
]


function App() {
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <main className='p-4'>
      <section className='flex flex-col gap-8'>
        <h1 className='text-4xl font-bold'>My tasks</h1>
        <AddTask setTasks={setTasks}/>
        <TaskList tasks={tasks}/>
      </section>
    </main>
  )
}

export default App
