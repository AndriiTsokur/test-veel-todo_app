import React from 'react';
import { TodoItem } from '@/app/components';

interface TodoListProps {
	todos: any[];
	onDelete: (id: number) => void;
	onToggleComplete: (id: number) => void; // Добавляем обработчик для переключения
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
					onToggleComplete={onToggleComplete} // Передаём обработчик в TodoItem
				/>
			))}
		</ul>
	);
};

export default TodoList;
