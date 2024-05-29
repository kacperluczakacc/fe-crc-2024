import { TaskList, AddNewTask } from './pages'
import { Route, Switch } from "react-router-dom"
import { ROUTE } from "./lib/constants"
import Header from "./components/Header"


function App() {

  return (
    <>
      <Header />
      <Switch>
        <Route path={ROUTE.ADD_TASKS}>
          <AddNewTask />
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList />
        </Route>
      </Switch>
    </>
  )
}

export default App
