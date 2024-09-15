import axios from "axios";
import { TasksState } from "types";

// Define a base URL for API requests
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch tasks from the API
export const fetchTasksFromAPI = async () => {
  const response = await api.get("/todos?_limit=5");
  return response.data;
};

// Add a new task to the API
export const addTaskToAPI = async (
  taskTitle: string,
  state: { tasks: TasksState }
) => {
  const newId = state.tasks.tasks.length
    ? Math.max(...state.tasks.tasks.map((task) => task.id)) + 1
    : 1;

  const response = await api.post("/todos", {
    title: taskTitle,
    completed: false,
  });

  return {
    id: newId,
    title: response.data.title,
    completed: response.data.completed,
  };
};

// Delete a task from the API
export const deleteTaskFromAPI = async (taskId: number) => {
  await api.delete(`/todos/${taskId}`);
};
