import { createContext, useContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotifyContext = createContext({})

export const NotifyContextProvider = (props : {children: React.ReactNode}) => {
  const [notify, notifyDispatch] = useReducer(notifyReducer, null)

  return (
    <NotifyContext.Provider value={[notify, notifyDispatch]}>
      {props.children}
    </NotifyContext.Provider>
  )
}
export const useNotifyValue = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[0]
}

export const useNotifyDispatch = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  setTimeout(() => {
    notifyAndDispatch[1]({type: 'CLEAR'})
  }, 5000)
  return notifyAndDispatch[1]
}
export default NotifyContext