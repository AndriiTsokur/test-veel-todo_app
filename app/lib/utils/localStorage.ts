import { Todo, TodosWithTimestamp } from '@/app/lib/interfaces';

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

export const setTodosToLocalStorage = (todos: Todo[]) => {
	const todosWithTimestamp: TodosWithTimestamp = {
		todos,
		timestamp: Date.now(),
	};
	localStorage.setItem('todos-veel', JSON.stringify(todosWithTimestamp));
};
