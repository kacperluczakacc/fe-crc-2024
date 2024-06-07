import { Dayjs } from "dayjs";

export enum CustomDate {
  TODAY,
  TOMORROW,
}

type State = {
  taskName: string;
  author: string;
  deadline: Dayjs | null;
  customButtonDate: CustomDate | null;
  taskNameError: boolean;
  deadlineError: boolean;
  authorError: boolean;
};

type Action =
  | { type: "SET_TASK_NAME"; payload: string }
  | { type: "SET_AUTHOR"; payload: string }
  | { type: "SET_DEADLINE"; payload: Dayjs | null }
  | { type: "SET_CUSTOM_BUTTON_DATE"; payload: CustomDate | null }
  | { type: "SET_ERRORS" }
  | { type: "SET_TASK_NAME_ERROR"; payload: boolean }
  | { type: "SET_AUTHOR_ERROR"; payload: boolean }
  | { type: "SET_DEADLINE_ERROR"; payload: boolean };

export const initialState: State = {
  taskName: "",
  author: "",
  deadline: null,
  customButtonDate: null,
  taskNameError: false,
  deadlineError: false,
  authorError: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TASK_NAME":
      return { ...state, taskName: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_DEADLINE":
      return { ...state, deadline: action.payload };
    case "SET_CUSTOM_BUTTON_DATE":
      return { ...state, customButtonDate: action.payload };
    case "SET_ERRORS":
      return {
        ...state,
        taskNameError: state.taskName.length < 3,
        authorError: state.author.length < 3,
        deadlineError: state.deadline === null,
      };
    case "SET_TASK_NAME_ERROR":
      return { ...state, taskNameError: action.payload };
    case "SET_AUTHOR_ERROR":
      return { ...state, authorError: action.payload };
    case "SET_DEADLINE_ERROR":
      return { ...state, deadlineError: action.payload };
    default:
      return state;
  }
}
