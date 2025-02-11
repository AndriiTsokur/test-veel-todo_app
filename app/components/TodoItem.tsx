import React from 'react';

interface TodoItemProps {
	id: number;
	title: string;
	completed: boolean;
	onDelete: (id: number) => void;
	onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	title,
	completed,
	onDelete,
	onToggleComplete,
}) => {
	return (
		<li
			className={`flex items-center justify-between p-2 mb-2 bg-gray-100 rounded ${
				completed && 'bg-green-200'
			}`}
		>
			<span
				onClick={() => onToggleComplete(id)}
				className={`flex-grow cursor-pointer ${
					completed ? 'line-through text-gray-500' : ''
				}`}
			>
				{title}
			</span>
			<button
				type='button'
				onClick={() => onDelete(id)}
				className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2'
			>
				Delete
			</button>
		</li>
	);
};

export default TodoItem;
