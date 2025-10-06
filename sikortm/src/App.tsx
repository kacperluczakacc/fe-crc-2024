// Komponenty w React.js są funkcjami, które zwracają jeden element DOM
// Składnia React.js jest JSX
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { AddTask, TaskList } from "./pages";
import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants.ts";
import { Header, Task } from "./components";

export type Task = {
  title: string;
  author: string;
  deadline: string;
  id: string;
}

// Hooks to wbudowane funkcje/narzędzia, które pozwalają nam w prosty sposób manipulować
// różnymi elementami/cyklami komponentów w React.js

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