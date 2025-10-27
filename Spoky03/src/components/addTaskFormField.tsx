import { errorsContent } from '../../lib/constants'
interface FormFieldProps {
    label: string;
    type: string;
    value: string | null;
    onChange: (input: React.FormEvent<HTMLInputElement>) => void;
    error: boolean;
}
export const FormField = ({ label, type, value, onChange, error}: FormFieldProps) => {
    return (
        <div className='flex flex-col relative'>
            <label className={`absolute -top-3 left-2 bg-secondary ` + (value !== null ? 'block' : 'hidden')} htmlFor={label}>{label}</label>
            <input onInput={(input) => onChange(input)}
                type={type} placeholder={value === null ? label + `*` : ''}
                className={`rounded-md border h-14 p-4 peer
              invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error ` + (error ? 'border-error' : '')}
                pattern='.{3,}'
                required
            />
            <span className="mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block">
                {(value && (value.length < 3 && value.length > 0)) ? errorsContent.taskAuthorLength : (error && `${label} ${errorsContent.requiredField}`)}
            </span>
        </div>
        // <div className='flex flex-col relative'>
        //             <label className={`absolute -top-3 left-2 bg-secondary ` + (taskName !== null ? 'block' : 'hidden')} htmlFor='taskName'>Task name</label>
        //             <input onInput={(input) => handleTasknameInput(input)}
        //                 className={`rounded-md border h-14 p-4 peer
        //           invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error` + (taskNameError ? ' border-error' : '')}
        //                 type='text' placeholder={taskName === null ? 'Task name*' : ''}
        //                 pattern='.{3,}'
        //                 required
        //             />
        //             <span className='mt-2 absolute top-12 left-4 hidden text-sm font-semibold text-error peer-[&:invalid]:block'>
        //                 <span className='text-slate-500 font-light'>{(taskName === null) ? '*required' : ''}</span>
        //                 {(taskName && (taskName.length < 3 && taskName.length > 0)) ? errorsContent.taskNameLength : (taskNameError && `Title ${errorsContent.requiredField}`)}
        //             </span>
        //         // </div> 

        // <div className='flex flex-col relative'>
        //             <label className={`absolute -top-3 left-2 bg-secondary ` + (taskAuthor !== null ? 'block' : 'hidden')} htmlFor='taskAuthor'>Author</label>
        //             <input onInput={(input) => handleAuthorInput(input)}
        //                 type='text' placeholder={taskAuthor === null ? 'Author' : ''}
        //                 className={`rounded-md border h-14 p-4 peer
        //           invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error ` + (taskAuthorError ? 'border-error' : '')}
        //                 pattern='.{3,}'
        //                 required
        //             />
        //             <span className="mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block">
        //                 {(taskAuthor && (taskAuthor.length < 3 && taskAuthor.length > 0)) ? errorsContent.taskAuthorLength : (taskAuthorError && `Author ${errorsContent.requiredField}`)}
        //             </span>
        //         </div>

        // <div className='flex flex-col relative'>
        //             <label className='absolute -top-3 left-2 bg-secondary'  htmlFor='taskDeadline'>Deadline</label>
        //             <input
        //             value={taskDeadline ? taskDeadline.format('DD/MM/YYYY') : ''}
        //             onInput={(input)=> handleDeadlineInput(input)}
        //             className={`rounded-md border h-14 p-4 peer
        //             invalid:[&:not(:placeholder-shown)]:outline-error invalid:[&:not(:placeholder-shown)]:border-error` + (taskDeadlineError ? ' border-error' : '')}
        //             type='text' placeholder={taskDeadline === null ? 'DD/MM/YYYY' : ''}
        //             pattern={RegExp.deadline.source}
        //             required
        //             />
        //                 <span className="mt-2 absolute top-12 left-4 hidden text-sm text-error peer-[&:invalid]:block">
        //                     {(taskDeadline) ? errorsContent.invalidDeadline : (taskDeadlineError && `Deadline ${errorsContent.requiredField}`) }
        //                 </span>
        //         </div>
    )
}