import Task from "./components/Task";

import { Route, Switch } from "react-router-dom";
import { AddTask, TaskList } from "./pages";
import Header from "./components/Header";

export type Task = {
  title: string;
  author: string;
  deadline: string;
  id: string;
};

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/add-tasks">
          <AddTask />
        </Route>
        <Route path="/">
          <TaskList />
        </Route>
      </Switch>
    </>
  );
};

export default App;
