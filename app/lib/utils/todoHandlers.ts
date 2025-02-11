import { fetchTodos, createTodo, deleteTodo } from '@/app/api/todos';
import {
	getTodosFromLocalStorage,
	setTodosToLocalStorage,
	getTodosTimestampFromLocalStorage,
} from '@/app/lib/utils/localStorage';

export const loadTodos = async () => {
	// setLoading(true);
	try {
		// Retrieve timestamp from local storage
		const lastSessionTimestamp = getTodosTimestampFromLocalStorage();

		// Fetch todos from local storage
		const storedTodos = getTodosFromLocalStorage();

		// Fetch todos from API only if no local storage or data is old.
		// Or when the app first open.
		if (!storedTodos || !lastSessionTimestamp) {
			const apiTodos = await fetchTodos();
			setTodosToLocalStorage(apiTodos); // Save new todos to local storage
			return apiTodos;
		} else {
			// Load from local storage
			return storedTodos.todos;
		}
	} catch (err: any) {
		throw new Error(err.message || 'Failed to fetch todos.');
	} finally {
		// setLoading(false);
	}
};
