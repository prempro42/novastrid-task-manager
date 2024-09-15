export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export type TaskFilter = "all" | "completed" | "pending";

export interface TasksState {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
}

export interface FetchTasksResponse {
  id: number;
  title: string;
  completed: boolean;
}
