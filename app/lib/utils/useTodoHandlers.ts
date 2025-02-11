import { useState } from 'react';
import { fetchTodos, createTodo, deleteTodo } from '@/app/api/todos';
import {
	getTodosFromLocalStorage,
	setTodosToLocalStorage,
} from '@/app/lib/utils/localStorage';
import { Todo } from '@/app/lib/interfaces';

interface UseTodoHandlersResult {
	todos: Todo[];
	loading: boolean;
	error: string | null;
	handleAddTodo: (title: string) => Promise<void>;
	handleDeleteTodo: (id: number) => Promise<void>;
	handleToggleComplete: (id: number) => Promise<void>;
	loadTodos: () => Promise<void>;
}

export const useTodoHandlers = (): UseTodoHandlersResult => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadTodos = async () => {
		setLoading(true);
		try {
			const storedTodos = getTodosFromLocalStorage();

			if (!storedTodos) {
				const apiTodos = await fetchTodos();

				setTodos(apiTodos);
				setTodosToLocalStorage(apiTodos);
			} else {
				setTodos(storedTodos);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to fetch todos.');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleAddTodo = async (title: string) => {
		try {
			const newTodo = await createTodo(title);

			setTodos((prevTodos) => [...prevTodos, newTodo]);
			setTodosToLocalStorage([...todos, newTodo]);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to add new todo.');
			}
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			await deleteTodo(id);

			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
			setTodosToLocalStorage(todos.filter((todo) => todo.id !== id));
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to delete todo.');
			}
		}
	};

	const handleToggleComplete = async (id: number) => {
		try {
			const updatedTodos = todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});
			setTodos(updatedTodos);
			setTodosToLocalStorage(updatedTodos);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to update todo.');
			}
		}
	};

	return {
		todos,
		loading,
		error,
		handleAddTodo,
		handleDeleteTodo,
		handleToggleComplete,
		loadTodos,
	};
};
