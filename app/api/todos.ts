import axios from 'axios';
import { API_URL, TARGET_USER_ID } from '@/app/lib/constants';

export const fetchTodos = async () => {
	try {
		const response = await axios.get(
			`${API_URL}?userId=${TARGET_USER_ID}&_limit=10`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching todos:', error);
		throw error;
	}
};

export const createTodo = async (title: string) => {
	try {
		const response = await axios.post(API_URL, {
			title,
			completed: false,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating todo:', error);
		throw error;
	}
};

export const deleteTodo = async (id: number) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting todo:', error);
		throw error;
	}
};
