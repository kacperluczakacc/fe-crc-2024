import { AddTask, TaskList } from "./pages";
import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants.ts";
import { Header, Task } from "./components";
import { Dayjs } from "dayjs";

export type Task = {
  title: string;
  author: string;
  deadline: Dayjs | null;
  id: string;
}


const App = () => {
  return (
   <>
    <Header/>
    <Switch>
      <Route path={ROUTE.ADD_TASK}>
        <AddTask />
      </Route>
      <Route path={ROUTE.HOME}>
        <TaskList />
      </Route>
    </Switch>
   </> 
  )
}

export default App