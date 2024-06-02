import { PayloadAction, createSlice, Dispatch, current} from '@reduxjs/toolkit'

const taskDeleteSlice = createSlice({
  name: 'taskDelete',
  initialState: [] as string[],
  reducers: {
    addTask: (state, action : PayloadAction<string>) => {
      if (state.includes(action.payload)) {
        return state.filter(taskId => taskId !== action.payload)
      } else {
        state.push(action.payload)
      }
      console.log('state', current(state))
    },
    unmarkTask: (state, action : PayloadAction<string>) => {
      return state.filter(taskId => taskId !== action.payload)
    },
  }
})

export const { addTask } = taskDeleteSlice.actions

export const markTaskToDelete = (taskId:string) => {
    return async (dispatch:Dispatch) => {
        dispatch(addTask(taskId))
    }
}
export const unmarkTaskToDelete = (taskId:string) => {
    return async (dispatch:Dispatch) => {
        dispatch(taskDeleteSlice.actions.unmarkTask(taskId))
    }
}
export default taskDeleteSlice.reducer