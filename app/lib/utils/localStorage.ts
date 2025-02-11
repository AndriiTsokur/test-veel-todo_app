// Function to get todos from local storage,
// it will return null if no items, or any existing.
export const getTodosFromLocalStorage = (): any | null => {
	const storedTodos = localStorage.getItem('todos-veel');
	return storedTodos ? JSON.parse(storedTodos) : null;
};

// Function to save todos to local storage with timestamp
export const setTodosToLocalStorage = (todos: any) => {
	const todosWithTimestamp = {
		todos,
		timestamp: Date.now(),
	};
	localStorage.setItem('todos-veel', JSON.stringify(todosWithTimestamp));
};

// Function to get timestamp for comparison between sessions
export const getTodosTimestampFromLocalStorage = (): number | null => {
	const storedTodos = localStorage.getItem('todos-veel');
	if (storedTodos) {
		const data = JSON.parse(storedTodos);
		return data.timestamp;
	} else {
		return null;
	}
};
