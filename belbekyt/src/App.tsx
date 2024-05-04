import { useState } from 'react'
import Task from "./components/Task.tsx";

import { AddTask, TaskList } from './pages';

import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './lib/constants.ts';
import Header from './components/Header.tsx';

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
    <>
      <Header />
      <Switch>
        <Route path={ROUTE.ADD_TASK}>
          <AddTask setTasks={setTasks}/>
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList tasks={tasks}/>
        </Route>
      </Switch>
    </>
  )
}

export default App
