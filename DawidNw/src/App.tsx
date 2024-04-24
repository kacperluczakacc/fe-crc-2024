import { useState } from "react"
import { TaskList, AddNewTask } from './pages'
import { Route, Switch } from "react-router-dom"
import { ROUTE } from "./lib/constants"
import Header from "./components/Header"

export type TaskT = {
  title: string,
  author: string,
  deadline: string,
}

const mockTasks: TaskT[] = [
  {
    title: "Task 1",
    author: "Dawid",
    deadline: "18-04-2024"
  },
  {
    title: "Task 2",
    author: "Dawid",
    deadline: "19-04-2024"
  },
  {
    title: "Task 3",
    author: "Dawid",
    deadline: "20-04-2024"
  },
]

function App() {

  const [tasks, setTasks] = useState(mockTasks)

  return (
    <>
      <Header />
      <Switch>
        <Route path={ROUTE.ADD_TASKS}>
          <AddNewTask setTasks={setTasks} />
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList tasks={tasks} />
        </Route>
      </Switch>
    </>
  )
}

export default App
