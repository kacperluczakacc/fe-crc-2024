import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit'
import requests from '../helpers/requests'
import { Dispatch } from '@reduxjs/toolkit'
import { Task as TaskType } from '../App'
import { unmarkTaskToDelete } from './taskDeleteReducer'


const taskSlice = createSlice({
  name: 'task',
  initialState: [] as TaskType[],
  reducers: {
    setTasks: (_state, action: PayloadAction<TaskType[]> ) => {
      return action.payload
    },
    addTask: (state, action : PayloadAction<TaskType>) => {
      state.push(action.payload)
    },
    deleteOne: (state, action: PayloadAction<string>) => {
        return state.filter(task => task.id !== action.payload)
    }
  }
})

export const { setTasks, addTask, deleteOne } = taskSlice.actions


export const initializeTasks = () => {
    return async (dispatch:Dispatch) => {
        const tasks = await requests.getTasks()
        if (tasks) {
            dispatch(setTasks(tasks))
        } else {
            console.log('Error fetching tasks')
        }   
    }
}
export const addNewTask = (task:TaskType) => {
    return async (dispatch:Dispatch) => {
        const newTask = await requests.addTask({ title: task.title, author: task.author, deadline: task.deadline } as TaskType)
        if (newTask) {
            dispatch(addTask(newTask))
        } else {
            console.log('Error adding task')
        }
    }
}
export const deleteTask = (id:string) => {
    return async (dispatch:Dispatch) => {
        const deletedTask = await requests.deleteTask(id)
        if (deletedTask) {
            dispatch(taskSlice.actions.deleteOne(id))
            dispatch(unmarkTaskToDelete(id) as unknown as UnknownAction) // xd
            console.log('Deleted task with id:', id)
        } else {
            console.log('Error deleting task')
        }
    }
}

export default taskSlice.reducer