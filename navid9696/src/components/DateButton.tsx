import { CustomDate } from '../pages/AddTask'

type DateButtonProps = {
	date: CustomDate
	onClick: (date: CustomDate) => void
	customButtonDate: CustomDate | null
}

const DateButton = ({ date, onClick, customButtonDate }: DateButtonProps) => {
	const isToday = date === CustomDate.TODAY
	const label = isToday ? 'Today' : 'Tomorrow'
	return (
		<button
			type='button'
			onClick={() => onClick(date)}
			className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
				customButtonDate === date ? 'bg-primary text-white' : ''
			}`}>
			{label}
		</button>
	)
}

export default DateButton
