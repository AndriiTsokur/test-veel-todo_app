import React from 'react';
import { Todo } from '@/app/lib/interfaces';
import { TodoItem } from '@/app/components';

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: number) => void;
	onToggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
	todos,
	onDelete,
	onToggleComplete,
}) => {
	return (
		<ul className='mt-4'>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					id={todo.id}
					title={todo.title}
					completed={todo.completed}
					onDelete={onDelete}
					onToggleComplete={onToggleComplete}
				/>
			))}
		</ul>
	);
};

export default TodoList;
