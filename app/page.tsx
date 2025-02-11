'use client';

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { fetchTodos, createTodo, deleteTodo } from '@/app/api/todos';
import {
	getTodosFromLocalStorage,
	setTodosToLocalStorage,
	getTodosTimestampFromLocalStorage,
} from '@/app/lib/utils/localStorage';
import { Todo } from '@/app/lib/interfaces';
import { TodoList, TodoForm } from '@/app/components';

const Page: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadTodos = async () => {
			setLoading(true);
			try {
				// Retrieve timestamp from local storage
				const lastSessionTimestamp = getTodosTimestampFromLocalStorage();

				// Fetch todos from local storage
				const storedTodos = getTodosFromLocalStorage();

				// Fetch todos from API only if no local storage or data is old.
				// Or when the app first open.
				if (!storedTodos || !lastSessionTimestamp) {
					const apiTodos = await fetchTodos();
					setTodos(apiTodos);
					setTodosToLocalStorage(apiTodos); // Save new todos to local storage
				} else {
					// Load from local storage
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

		loadTodos();
	}, []);

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
			await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				completed: updatedTodos.find((todo) => todo.id === id)?.completed,
			});
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const axiosError = err as AxiosError;
				setError(axiosError.message || 'Failed to update todo.');
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to update todo.');
			}
		}
	};

	if (loading) {
		return <p>Loading todos...</p>;
	}
	if (error) {
		return <p className='text-red-500'>Error: {error}</p>;
	}

	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Todo App For Veel</h1>
			<TodoForm onAdd={handleAddTodo} />
			<TodoList
				todos={todos}
				onDelete={handleDeleteTodo}
				onToggleComplete={handleToggleComplete}
			/>
		</main>
	);
};

export default Page;
