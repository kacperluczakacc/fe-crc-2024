import { CustomDate  } from "../lib/constants"

type ButtonProps = {
    text: string,
    customButtonDate: CustomDate | null,
    customDateCurrent: CustomDate
    dispatch: any
}

export default function Button({ text, customButtonDate, customDateCurrent, dispatch }: ButtonProps) {
    return (
        <button
        onClick={dispatch}
        className={`
          border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white
          ${customButtonDate === customDateCurrent ? "bg-primary text-white" : ""}
        `}
        type="button"
      >
        {text}
      </button>
    )
}