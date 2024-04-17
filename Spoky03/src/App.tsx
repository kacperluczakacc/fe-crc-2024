import { useState } from 'react'
import { Task } from './components/task'
import { TaskList } from './components/taskList'
import { AddTaskForm } from './components/addTaskForm'

export type Task = {
  title : string,
  author : string,
  deadline: string
}

const mockTasks: Task[] = [
  {
    title : 'Task 1',
    author : 'Author 1',
    deadline: "10.05.2025"
  },
  {
    title : 'Task 2',
    author : 'Author 2',
    deadline: "10.05.2024"
  },
  {
    title : 'Task 3',
    author : 'Author 3',
    deadline: "01.05.2025"
  }
]


const App = () => {

  const [tasks, setTasks] = useState(mockTasks)


  return (
    <>
    <div className='bg-slate-700 text-slate-200 h-screen'>
      <div className='text-4xl text-slate-100'>My App</div>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl'>Tasks</h1>
        <div className='flex justify-center m-2'>
          <AddTaskForm setTasks={setTasks} />
        </div>
        <TaskList tasks={tasks} />
        
      </div>
    </div>
    </>
  )
}

export default App
