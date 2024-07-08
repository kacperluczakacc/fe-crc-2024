type InputFieldProps = {
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	error: boolean
	errorMessage: string
	onFocus: () => void
}

const InputField = ({ label, value, onChange, error, errorMessage, onFocus }: InputFieldProps) => {
	return (
		<div className='flex flex-col relative'>
			<label className='absolute -top-3 left-2 bg-secondary px-2'>{label}</label>
			<input
				onFocus={onFocus}
				onChange={onChange}
				value={value}
				className={`border h-14 p-4 ${error && 'border-red-500'}`}
				type='text'
			/>
			<p className='text-red-500 h-5 text-sm'>{error && errorMessage}</p>
		</div>
	)
}

export default InputField
