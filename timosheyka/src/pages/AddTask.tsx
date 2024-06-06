/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { AddTaskError, ROUTE } from "../lib/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Link, useHistory } from "react-router-dom";
import { EndPoint } from "../api/constants";

enum CustomDate { TODAY, TOMORROW }

type addTaskState = { 
  taskName: { name: string, error: boolean, isValid: boolean },
  author: { name: string, error: boolean, isValid: boolean },
  deadline: { date: Dayjs | null, error: boolean, isValid: boolean },
  customButtonDate: CustomDate | null
}

function reducer(state: addTaskState, action: { type: string, payload: any}) {
  switch (action.type) {
    case 'set_taskName':
      return { ...state, taskName: { 
        ...state.taskName,
        name: action.payload,
        //isValid: action.payload.length >= 3
      }}
    case 'set_taskName_error':
      return { ...state, taskName: { ...state.taskName, error: action.payload } }
    case 'set_author':
      return { ...state, author: { 
        ...state.author,
        name: action.payload,
        //isValid: action.payload.length >= 3
      }}
    case 'set_author_error':
      return { ...state, author: { ...state.author, error: action.payload } }
    case 'set_deadline':
      return { ...state, deadline: { 
        ...state.deadline, 
        date: action.payload,
        //isValid: action.payload !== null
      }}
    case 'set_deadline_error':
      return { ...state, deadline: { ...state.deadline, error: action.payload }}
    case 'set_customButtonDate':      
      return { ...state, customButtonDate: action.payload }
    default:
      return state
  }
}

export default function AddTask() {
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, {
    taskName: { name: "", error: false, isValid: false }, 
    author: { name: "", error: false, isValid: false }, 
    deadline: { date: null, error: false, isValid: false },
    customButtonDate: null
  })

  const { taskName, author, deadline, customButtonDate } = state

  const isTaskNameValid = taskName.name.length >= 3;
  const isAuthorValid = author.name.length >= 3;
  const isDeadlineValid = deadline.date !== null;

  useEffect(() => {
      dispatch({ type: 'set_taskName_error', payload: taskName.name.length > 0 && !isTaskNameValid })
      dispatch({ type: 'set_author_error', payload: author.name.length > 0 && !isAuthorValid })
  }, [taskName.name, author.name, isTaskNameValid, isAuthorValid])

  useEffect(() => {
    if (customButtonDate === null) 
      dispatch({ type: "set_deadline", payload: null })
    else {      
      dispatch({ type: "set_deadline", payload: customButtonDate === CustomDate.TODAY ? dayjs() : dayjs().add(1, "day") })
      dispatch({ type: 'set_deadline_error', payload: false })
    }
  }, [customButtonDate]);

  async function addNewTaskRoServer() {
    const response = await fetch(EndPoint.TASKS, {
      method: "POST",
      body: JSON.stringify(
        { title: taskName.name, author: author.name, deadline: deadline.date?.toString() }
      )
    })
    return response
  }

  async function handleSaveClick() {
    if (isTaskNameValid && isAuthorValid && isDeadlineValid) {
      const response = await addNewTaskRoServer()
      if (response.ok) 
        history.push(ROUTE.HOME)
    } else {
      console.log('save', isAuthorValid);
      dispatch({ type: 'set_taskName_error', payload: !isTaskNameValid })
      dispatch({ type: 'set_author_error', payload: !isAuthorValid })
      dispatch({ type: 'set_deadline_error', payload: !isDeadlineValid })
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <Link to={ROUTE.HOME}><CloseIcon size={24}/></Link>
        <h1 className="text-xl">Create new task</h1>
        <button 
          className="text-primary font-bold" 
          onClick={handleSaveClick}
          type="button"
        >
          Save
        </button>
      </div>

      <form className="flex flex-col gap-10 my-6 px-5">
        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">Task name</label>
          <input
            onInput={(input) => dispatch({ type: "set_taskName", payload: input.currentTarget.value }) }
            className="border h-14 p-4"
            type="text"
          />
          {taskName.error && <p className="text-red-500">{AddTaskError.TASK_NAME}</p>}
        </div>

        <div className="flex flex-col relative">
          <label className="absolute -top-3 left-2 bg-secondary px-2">Author</label>
          <input
            onInput={(input) => dispatch({ type: 'set_author', payload: input.currentTarget.value })}
            className="border h-14 p-4"
            type="text"
          />
          {author.error && <p className="text-red-500">{AddTaskError.AUTHOR}</p>}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => 
              dispatch({ 
                type: 'set_customButtonDate', 
                payload: customButtonDate === CustomDate.TODAY ? null : CustomDate.TODAY
              })
            }
            className={`
              border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white
              ${customButtonDate === CustomDate.TODAY ? "bg-primary text-white" : ""}
            `}
            type="button"
          >
            Today
          </button>
          <button
            onClick={() =>
              dispatch({ 
                type: 'set_customButtonDate', 
                payload: customButtonDate === CustomDate.TOMORROW ? null : CustomDate.TOMORROW
              })
            }
            className={`
              border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white 
              ${customButtonDate === CustomDate.TOMORROW ? "bg-primary text-white" : ""}
            `}
            type="button"
          >
            Tomorrow
          </button>
        </div>

        <p>or select your date</p>

        <div>
          <DatePicker
            onChange={(date) => {
              dispatch({ type: 'set_deadline', payload: date })
              dispatch({ type: 'set_deadline_error', payload: false })
            }}
            onOpen={() => dispatch({ type: 'set_customButtonDate', payload: null}) }
            className="w-full"
            value={customButtonDate !== null ? null : deadline.date}
            format="DD/MM/YYYY"
          />
          {deadline.error && <p className="text-red-500">{AddTaskError.DEADLINE}</p>}
        </div>
      </form>
    </section>
  );
}