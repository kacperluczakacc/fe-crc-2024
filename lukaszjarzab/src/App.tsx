import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import { AddTask, TaskList } from "./pages";
import Header from "./components/Header";

export type TaskType = {
  title: string;
  author: string;
  deadline: string;
  id: string;
};

const App = () => {
  // async function getTasks() {
  //   // Kazda funkcja asynchroniczna zwraca Promise - czyli obiekt
  //   // ktory reprezentuje jakas ew. wartosc
  //   // Promise moze miec 3 stany
  //   // - pending
  //   // - fulfilled -> wartosc jest zwracana i jest obecna
  //   // - rejected -> wartosc nie zostala zwrocona
  //   const response = await fetch("http://localhost:3000/tasks");
  //   const data = await response.json();
  //   console.log(data);
  // }

  // async function addNewTask() {
  //   const response = await fetch("http://localhost:3000/tasks", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: "New task no. 4",
  //       author: "Łukasz",
  //       deadline: "19/09/2025",
  //     }),
  //   });
  //   if (response.status === 201) {
  //     console.log("Added");
  //   } else {
  //     console.log("Error, not added");
  //   }
  //   console.log(response);
  // }

  // async function updateTask(id: string) {
  //   const response = await fetch(`http://localhost:3000/tasks${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       title: "Updated task",
  //       author: "",
  //     }),
  //   });
  // }

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
