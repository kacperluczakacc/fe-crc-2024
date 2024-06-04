import { FormInputType, FormErrorType, validateTextInput, TaskAction } from "../pages/AddTask";
import { FormError } from "./";

export default function FormLabeledInput({title, type, errorType, setValue}: {
    title: string
    type: FormInputType
    errorType: FormErrorType
    setValue: React.Dispatch<TaskAction>
    }){
    return (
        <div className='flex flex-col relative'>
            <label className='absolute -top-3 left-2 bg-secondary px-2'>{title}</label>
            <input 
                onFocus={() => setValue({ type: `${type}Error`, newString: '', newError: '' })}
                onInput={inputValue => {
                    setValue({ type: type, newString: inputValue.currentTarget.value.trim(), newError: '' });
                    validateTextInput(`${type}Error`, inputValue.currentTarget.value.trim(), setValue);
                }}
                className={'border h-14 p-4 ' + (errorType != '' && 'border-red-700')}
                type="text" 
            />
            { errorType != '' && <FormError type={type} errorType={errorType} /> }
        </div>
    );
}