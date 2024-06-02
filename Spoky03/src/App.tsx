import { useContext, useEffect } from 'react'
import { Task } from './components/task'
import { TaskList } from './components/taskList'
import { AddTaskForm } from './components/addTaskForm'
import { Route,Switch} from 'react-router-dom'
import { ROUTE } from '../lib/constants'
import { Header } from './components/Header'
import {Dayjs} from 'dayjs'
import { useDispatch } from 'react-redux'
import { initializeTasks } from './reducers/taskReducer'
import { AppDispatch } from './store'
import { useNotifyValue, useNotifyDispatch } from './components/notifyContext'



export type Task = {
  title : string,
  author : string,
  deadline: Dayjs,
  id: string
}

const App = () => {

  const dispatch = useDispatch<AppDispatch>()
  
  const notify = useNotifyValue()
  const notifyDispatch = useNotifyDispatch()

  useEffect(() => {
    dispatch(initializeTasks())
    notifyDispatch({type: 'SET', payload: 'Welcome to the task manager'})
  }, [dispatch])

  return (
    <>

    <div className='bg-white h-screen'>
      <Header />
      
      <p className='min-h-8 bg-primary text-white text-center'>{notify}</p>
      
      <div className='flex flex-col gap-5'>
        <Switch>
          <Route path={ROUTE.ADD_TASK}>
            <AddTaskForm />
          </Route>

          <Route path={ROUTE.HOME}>
            <TaskList />
          </Route>
        </Switch>
        
      </div>
    </div>
    </>
  )
}

export default App
