'use client';

import React, { useEffect } from 'react';
import { useTodoHandlers } from '@/app/lib/utils/useTodoHandlers';
import { TodoList, TodoForm } from '@/app/components';

const Page: React.FC = () => {
	const {
		todos,
		loading,
		error,
		handleAddTodo,
		handleDeleteTodo,
		handleToggleComplete,
		loadTodos,
	} = useTodoHandlers();

	useEffect(() => {
		loadTodos();
	}, []);

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
