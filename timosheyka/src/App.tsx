import { useState } from "react";
import Task from "./components/Task";
import { AddTask, TaskList } from "./pages";
import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import Header from "./components/Header";

export type Task = {
  title: string,
  author: string,
  deadline: string
}

const mockTasks: Task[] = [
  { title: "Task 1", author: "Tim", deadline: "18/09/2025" },
  { title: "Task 2", author: "Sam", deadline: "18/09/2024" },
  { title: "Task 3", author: "Nick", deadline: "18/01/2025" }
];

const App = () => {
  const [tasks, setTasks] = useState(mockTasks);

  return (
    <>
      <Header/>
      <Switch>
        <Route path={ROUTE.ADD_TASK}>
          <AddTask setTasks={setTasks} />
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList tasks={tasks} />
        </Route>
      </Switch>
    </>
  )
}

export default App
