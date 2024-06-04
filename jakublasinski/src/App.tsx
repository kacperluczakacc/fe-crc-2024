import Task from "./components/Task";

import { AddTask, TaskList } from "./pages";

import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import Header from "./components/Header";

export type Task = {
  title: string;
  author: string;
  deadline: string;
  id: string;
};


async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks");
  const data = await response.json();
  console.log(data);
}

async function addNewTask() {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    body: JSON.stringify({
      title: "New task no. 4",
      author: "Kacper",
      deadline: "19/09/2025",
    }),
  });
}

async function updateTask(id: string) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT", // aktualizacja danych dla elementu w bazie danych reprezentowanych przed podany ID
    body: JSON.stringify({
      title: "Updated task no. 4",
    }),
  });
  console.log(response);
}

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={ROUTE.ADD_TASK}>
          <AddTask />
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList />
        </Route>
      </Switch>
    </>
  );
};

export default App;