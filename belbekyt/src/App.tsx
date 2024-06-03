import { useState } from 'react'

import { AddTask, TaskList } from './pages';

import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './lib/constants.ts';
import Header from './components/Header.tsx';

export type TaskType = {
  title: string;
  author: string;
  deadline: string;
  id: string;
}

async function getTasks() {
  const resposnse = await fetch('http://localhost:3000/tasks');
  const data = await resposnse.json();
}

async function addNewTask() {
  const resposnse = await fetch('http://localhost:3000/tasks', {
    method: "POST",
    body: JSON.stringify({
      title: "New task",
      author: "Miłosz",
      deadline: "19/09/2025" 
    })
  });
}

async function updateTask(id: string){
  const resposnse = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: "Updated task no. 4"
    })
  });
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
  )
}

export default App
