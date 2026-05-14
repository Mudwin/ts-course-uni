import { Status, Priority } from "./enums";

type Todo = {
  todo: string;
  priority: Priority;
};

export type User = {
  name: string;
  status: Status;
  todos: Todo[];

  changeStatus: (newStatus: Status) => void;
  addTodo: (todo: string, priority?: Priority) => void;
  displayTodos: () => void;
  displayActiveTodos: () => void;
};
