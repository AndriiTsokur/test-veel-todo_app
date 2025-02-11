import React, { useState } from 'react';

interface TodoFormProps {
	onAdd: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
	const [title, setTitle] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (title.trim()) {
			onAdd(title);
			setTitle('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='mb-4'>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Add new todo...'
				className='border p-2 mr-2 rounded focus:outline-none focus:ring focus:border-blue-300'
			/>
			<button
				type='submit'
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
			>
				Add
			</button>
		</form>
	);
};

export default TodoForm;
