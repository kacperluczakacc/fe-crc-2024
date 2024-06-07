import React, { ChangeEvent } from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col relative">
    <label className="absolute -top-3 left-2 bg-secondary px-2">{label}</label>
    <input
      value={value}
      onChange={onChange}
      className="border h-14 p-4"
      type="text"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
