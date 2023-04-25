export interface ToDoState {
  toDos: ToDo[];
  category: string;
  done?: boolean;
}

export interface ToDo {
  id: number;
  label: string;
  description: string;
  category: string;
  done: boolean | string;
}
