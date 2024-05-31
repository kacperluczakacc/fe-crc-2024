
type InputProps = {
    labelName: string;
    setAttrValue: React.Dispatch<React.SetStateAction<string>>;
    inputError: boolean;
    errorText: string
};

export default function AddInput({ labelName, setAttrValue, inputError, errorText }: InputProps) {
    return (
        <div className="flex flex-col relative">
            <label className="absolute -top-3 left-2 bg-secondary px-2">
                {labelName}
            </label>
            <input
                className="border h-14 p-4"
                type="text"
                onInput={(input) => setAttrValue(input.currentTarget.value)}
            />
            {inputError && <p className="text-red-500">{errorText}</p>}
        </div>
    )
}
