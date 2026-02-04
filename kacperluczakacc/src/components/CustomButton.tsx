import React from 'react'

enum CustomDate {
	TODAY,
	TOMORROW,
}

type CustomButtonProps = {
	label: string
	dateType: CustomDate
	customButtonDate: CustomDate | null
	handleCustomButtonClick: (date: CustomDate) => void
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, dateType, customButtonDate, handleCustomButtonClick }) => {
	return (
		<button
			type='button'
			onClick={() => handleCustomButtonClick(dateType)}
			className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
				customButtonDate === dateType ? 'bg-primary text-white' : ''
			}`}>
			{label}
		</button>
	)
}

export default CustomButton
