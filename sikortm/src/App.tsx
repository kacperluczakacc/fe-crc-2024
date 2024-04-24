// Komponenty w React.js są funkcjami, które zwracają jeden element DOM
// Składnia React.js jest JSX
// Argumenty przekazywane do komponentów Reactowych nazywamy PROPS

import { useState } from "react";
import { AddTask, TaskList } from "./pages";
import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constans.ts";
import { Header, Task } from "./components";

export type Task = {
  title: string;
  author: string;
  deadline: string;
}

// Coming from server
const mockTasks: Task[] = [
  {
    title: 'Task 1',
    author: 'Jakub',
    deadline: '18/09/2024'  
  },
  {
    title: 'Task 2',
    author: 'Wiktoria',
    deadline: '21/09/2024'  
  },
  {
    title: 'Task 3',
    author: 'Mateusz',
    deadline: '19/09/2024'  
  }
];

// Hooks to wbudowane funkcje/narzędzia, które pozwalają nam w prosty sposób manipulować
// różnymi elementami/cyklami komponentów w React.js

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);

  return (
   <>
    <Header/>
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