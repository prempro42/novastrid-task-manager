import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Task interface
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  filter: "all", // Added filter state
  loading: false,
  error: null,
};

// Fetch tasks from mock API (JSONPlaceholder)
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data.map((task: Task) => ({
    id: task.id,
    title: task.title,
    completed: task.completed,
  }));
});

// Add a task to mock API
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskText: string, { getState }) => {
    const state = getState() as { tasks: TasksState };
    const newId = state.tasks.tasks.length
      ? Math.max(...state.tasks.tasks.map((task) => task.id)) + 1
      : 1;

    // Simulate adding task to mock API
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: taskText,
        completed: false,
      }
    );
    return {
      id: newId, // Use client-generated ID
      title: response.data.title,
      completed: response.data.completed,
    };
  }
);

// Delete a task from mock API
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    return taskId;
  }
);

// Create the slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskCompletion(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { toggleTaskCompletion, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
