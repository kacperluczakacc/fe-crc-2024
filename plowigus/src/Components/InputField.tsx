import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  errorMessage: string;
  type?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  error,
  errorMessage,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="flex flex-col relative">
      <label className="absolute -top-3 left-2 bg-secondary px-2">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className={`border h-14 p-4 ${error ? "border-red-500" : ""}`}
        type={type}
      />
      {error && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
