import { ReactNode, MouseEvent } from "react";

type CustomDateButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  active: boolean;
  children: ReactNode;
};

const CustomDateButton = ({
  onClick,
  active,
  children,
}: CustomDateButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
      active ? "bg-primary text-white" : ""
    } `}
  >
    {children}
  </button>
);

export default CustomDateButton;
