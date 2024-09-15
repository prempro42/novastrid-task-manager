import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksFromAPI,
  addTaskToAPI,
  deleteTaskFromAPI,
} from "../utils/api";
import { TasksState } from "types";

const initialState: TasksState = {
  tasks: [],
  filter: "all",
  loading: false,
  error: null,
};

// Thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await fetchTasksFromAPI();
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskTitle: string, { getState }) => {
    const state = getState() as { tasks: TasksState };
    const task = await addTaskToAPI(taskTitle, state);
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await deleteTaskFromAPI(taskId);
    return taskId;
  }
);

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
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add task";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { setFilter, toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;
