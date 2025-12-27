type FormFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id: string;
  placeholder?: string;
};

export default function FormField({ label, value, onChange, error }: FormFieldProps) {
  return (
    <div className="flex flex-col relative">
      <label className="absolute -top-3 left-2 bg-secondary px-2">{label}</label>
      <input value={value} onChange={onChange} className="border h-14 p-4" type="text" />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
