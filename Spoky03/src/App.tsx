import { useState } from 'react'
import { Task } from './components/task'
import { TaskList } from './components/taskList'
import { AddTaskForm } from './components/addTaskForm'
import { Route,Switch } from 'react-router-dom'
import { ROUTE } from '/lib/constants'
import { Header } from './components/Header'

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

    <div className='bg-white h-screen'>
      <Header />
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl'>Hi, got a new thing to add?</h1>
        <Switch>
        <Route path={ROUTE.ADD_TASK}>
          <AddTaskForm setTasks={setTasks} />
        </Route>

        <Route path={ROUTE.HOME}>
          <TaskList tasks={tasks} />
        </Route>
        </Switch>
        
      </div>
    </div>
    </>
  )
}

export default App
