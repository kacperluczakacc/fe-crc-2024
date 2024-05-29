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
