export enum CustomDate {
  TODAY,
  TOMORROW,
}

export const initialState = {
  deadline: null,
  customButtonDate: null,
  author: "",
  taskName: "",
  taskNameError: false,
  deadlineError: false,
  authorError: false,
};

export const actionTypes = {
  SET_TASK_NAME: "SET_TASK_NAME",
  SET_AUTHOR: "SET_AUTHOR",
  SET_DEADLINE: "SET_DEADLINE",
  SET_CUSTOM_BUTTON_DATE: "SET_CUSTOM_BUTTON_DATE",
  SET_TASK_NAME_ERROR: "SET_TASK_NAME_ERROR",
  SET_DEADLINE_ERROR: "SET_DEADLINE_ERROR",
  SET_AUTHOR_ERROR: "SET_AUTHOR_ERROR",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_TASK_NAME:
      return { ...state, taskName: action.payload };
    case actionTypes.SET_AUTHOR:
      return { ...state, author: action.payload };
    case actionTypes.SET_DEADLINE:
      return { ...state, deadline: action.payload };
    case actionTypes.SET_CUSTOM_BUTTON_DATE:
      return { ...state, customButtonDate: action.payload };
    case actionTypes.SET_TASK_NAME_ERROR:
      return { ...state, taskNameError: action.payload };
    case actionTypes.SET_DEADLINE_ERROR:
      return { ...state, deadlineError: action.payload };
    case actionTypes.SET_AUTHOR_ERROR:
      return { ...state, authorError: action.payload };
    default:
      return state;
  }
}
