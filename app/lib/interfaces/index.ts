export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}
export interface TodosWithTimestamp {
	todos: Todo[];
	timestamp: number;
}
