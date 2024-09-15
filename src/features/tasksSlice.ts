import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  nextTaskId: number;
  filter: "all" | "completed" | "pending";
}

const initialState: TaskState = {
  tasks: [],
  nextTaskId: 1,
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: state.nextTaskId,
        text: action.payload,
        completed: false,
      });
      state.nextTaskId += 1;
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "pending">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask, setFilter } =
  tasksSlice.actions;

export default tasksSlice.reducer;
