import { FormInputType, FormErrorType, validateTextInput } from "../pages/AddTask";
import { FormError } from "./";

export default function FormLabeledInput({title, type, errorType, setError, setValue}: {
    title: string
    type: FormInputType
    errorType: FormErrorType
    setError: React.Dispatch<React.SetStateAction<FormErrorType>>
    setValue: (value: string) => void
    }){
    return (
        <div className='flex flex-col relative'>
            <label className='absolute -top-3 left-2 bg-secondary px-2'>{title}</label>
            <input 
                onFocus={() => setError('')}
                onInput={inputValue => {
                    setValue(inputValue.currentTarget.value.trim())
                    validateTextInput(inputValue.currentTarget.value.trim(), setError);
                }}
                className={'border h-14 p-4 ' + (errorType != '' && 'border-red-700')}
                type="text" 
            />
            { errorType != '' && <FormError type={type} errorType={errorType} /> }
        </div>
    );
}