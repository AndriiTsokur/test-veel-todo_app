import { Todo } from '@/app/lib/interfaces';

interface TodosWithTimestamp {
	todos: Todo[];
	timestamp: number;
}

// Function to get todos from local storage,
// it will return null if no items, or any existing.
export const getTodosFromLocalStorage = (): Todo[] | null => {
	const storedTodos = localStorage.getItem('todos-veel');
	if (storedTodos) {
		try {
			const parsedData: TodosWithTimestamp = JSON.parse(storedTodos);
			return parsedData.todos;
		} catch (e) {
			console.error('Error parsing todos from localStorage:', e);
			return null;
		}
	}
	return null;
};

// Function to save todos to local storage with timestamp
export const setTodosToLocalStorage = (todos: Todo[]) => {
	const todosWithTimestamp: TodosWithTimestamp = {
		todos,
		timestamp: Date.now(),
	};
	localStorage.setItem('todos-veel', JSON.stringify(todosWithTimestamp));
};

// Function to get timestamp for comparison between sessions
export const getTodosTimestampFromLocalStorage = (): number | null => {
	const storedTodos = localStorage.getItem('todos-veel');
	if (storedTodos) {
		try {
			const data: TodosWithTimestamp = JSON.parse(storedTodos);
			return data.timestamp;
		} catch (e) {
			console.error('Error parsing timestamp from localStorage:', e);
			return null;
		}
	} else {
		return null;
	}
};
