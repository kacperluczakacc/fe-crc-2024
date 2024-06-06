import TaskList from './pages/TaskList.tsx';
import AddTask from './pages/AddTask.tsx';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { ROUTE } from './lib/constants.ts';
import Header from './components/Header.tsx';

export type TaskType = {
  title: string,
  author: string,
  deadline: string,
  id: string,
  checkedTaskId: React.Dispatch<React.SetStateAction<string>>
}

// async function getTask(){
//   const response = await fetch('http://localhost:3000/tasks');
//   const data = await response.json();
//   console.log(data);
// }

// async function addNewTask(){
//   const response = await fetch('http://localhost:3000/tasks', {
//     method: "POST",
//     body: JSON.stringify({
//       title: "New task no. 4",
//       author: "Kacper",
//       deadline: "19/09/2025"
//     })
//   });
//   console.log(response);
// }

// async function updateTask(id: string){
//   const response = await fetch(`http://localhost:3000/tasks/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       title: "Updated task no. 4"
//     })
//   });
// }

const App = () => {
  return (
    < >
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
