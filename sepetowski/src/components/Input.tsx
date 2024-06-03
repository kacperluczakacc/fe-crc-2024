interface Props {
	label: string;
	inputValue: string;
	error: boolean;
	errorMessage: string;
	onInput: (e: string) => void;
}

export const Input = ({ error, errorMessage, inputValue, label, onInput }: Props) => {
	return (
		<div className='flex flex-col relative'>
			<label className='absolute -top-3 left-2 bg-secondary px-2'>{label}</label>
			<input
				className='border h-14 p-4'
				type='text'
				onInput={(input) => onInput(input.currentTarget.value)}
				value={inputValue}
			/>
			{error && <p className='text-red-500'>{errorMessage}</p>}
		</div>
	);
};
