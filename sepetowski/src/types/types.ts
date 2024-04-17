export interface Task {
	id: string;
	title: string;
	author: string;
	deadline: Date;
}
export interface NewTask {
	title: string;
	author: string;
	deadline: Date;
}
