import { InputText as InputTextType } from '../App'

export default function InputText({ label, value, onChange, error, errorMessage }: InputTextType) {
	return (
		<div className='flex flex-col relative'>
			<label className='absolute -top-3 left-2 bg-secondary px-2'>{label}</label>
			<input onInput={e => onChange(e.currentTarget.value)} className='border h-14 p-4' type='text' value={value} />
			{error && <p className='text-red-500'>{errorMessage}</p>}
		</div>
	)
}
