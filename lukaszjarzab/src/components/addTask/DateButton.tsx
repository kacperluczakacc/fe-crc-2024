import { CustomDate } from "../../lib/constants";

interface DateButtonProps {
  handleCustomButtonClick: (date: CustomDate) => void;
  customButtonDate: CustomDate | null;
  day: CustomDate;
  text: string;
}

const DateButton = ({
  handleCustomButtonClick,
  customButtonDate,
  day,
  text,
}: DateButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => handleCustomButtonClick(day)}
      className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
        customButtonDate === day ? "bg-primary text-white" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default DateButton;
