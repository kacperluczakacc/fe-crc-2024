import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTE } from "./lib/constants";
import { AddTask, TaskList } from "./pages";
import Header from "./components/Header";
import dayjs, { Dayjs } from "dayjs";

export type TaskType = {
  title: string;
  author: string;
  deadline: Dayjs;
};

const App = () => {
  return (
    // <main className="p-4">
    //   <section className="flex flex-col gap-8">
    //     <h1 className="text-4xl font-bold">My tasks</h1>
    //     <AddTask setTasks={setTasks} />
    //     <TaskList tasks={tasks} />
    //   </section>
    // </main>

    <>
      <Header />
      <Switch>
        <Route path={ROUTE.ADD_TASK}>
          <AddTask setTasks={setTasks} />
        </Route>
        <Route path={ROUTE.HOME}>
          <TaskList tasks={tasks} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
