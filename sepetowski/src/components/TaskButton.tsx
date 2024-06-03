import { CustomDate } from '../pages/AddTask';

interface Props {
	label: string;
	dateType: CustomDate;
	customButtonDate: CustomDate | null;
	onClick?: (date: CustomDate) => void;
}

export const TaskButton = ({ customButtonDate, dateType, label, onClick }: Props) => {
	return (
		<button
			type='button'
			onClick={() => onClick && onClick(dateType)}
			className={`border rounded-lg px-4 py-1 border-slate-300 hover:bg-primary hover:text-white ${
				customButtonDate === dateType ? 'bg-primary text-white' : ''
			}`}>
			{label}
		</button>
	);
};
