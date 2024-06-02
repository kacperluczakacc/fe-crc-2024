import { Action } from "../../pages/AddTask";
import { Dispatch } from "react";

interface TextInputProps {
  dispatch: Dispatch<Action>;
  dispatchType: "SET_TASK_NAME" | "SET_TASK_AUTHOR";
  hideTaskError: () => void;
  taskError: boolean;
  taskErrorText: string;
  label: string;
}

const TextInput = ({
  dispatch,
  dispatchType,
  hideTaskError,
  taskError,
  taskErrorText,
  label,
}: TextInputProps) => {
  return (
    <div className="flex flex-col relative">
      <label className="absolute -top-3 left-2 bg-secondary">{label}</label>
      <input
        onInput={(input) =>
          dispatch({
            type: dispatchType,
            payload: input.currentTarget.value,
          })
        }
        className="border h-14 p-4"
        type="text"
        onFocus={hideTaskError}
      />
      {taskError && <p className="text-red-500">{taskErrorText}</p>}
    </div>
  );
};

export default TextInput;
