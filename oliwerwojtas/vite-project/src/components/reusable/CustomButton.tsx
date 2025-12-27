import { ReactNode, MouseEventHandler } from "react";

type CustomButtonProps = {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

function CustomButton({ isActive, onClick, children }: CustomButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border hover:text-white hover:bg-primary ${
        isActive ? "bg-primary text-white" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
