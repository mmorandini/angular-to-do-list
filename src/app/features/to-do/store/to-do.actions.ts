import {createAction, props} from '@ngrx/store';
import {ToDo} from './to-do.state';

export enum ToDoActions {
  LoadToDos = '[ToDo] Load toDos',
  LoadToDosSuccess = '[ToDo] Load ToDos success',
  LoadToDosFailure = '[ToDo] Load ToDos failure',
  AddToDo = '[ToDo] Add ToDo',
  AddToDoSuccess = '[ToDo] Add ToDo success',
  AddToDosFailure = '[ToDo] Add ToDo failure',
  SetCategoryFilter = '[ToDo] Set category filter (client-side)',
  SetDoneFilter = '[ToDo] Set done filter (server-side)',
  ToggleToDo = '[ToDo] Toggle ToDo',
  UpdateToDo = '[ToDo] Update ToDo',
  UpdateToDoSuccess = '[ToDo] Update ToDo success',
  UpdateToDoFailure = '[ToDo] Update ToDo Failure',
  DeleteToDo = '[ToDo] Delete ToDo',
  DeleteToDoSuccess = '[ToDo] Delete Todo success',
  DeleteToDoFailure = '[ToDo] Delete ToDo failure'
}

export const loadToDos = createAction(
  ToDoActions.LoadToDos,
);

export const loadToDosSuccess = createAction(
  ToDoActions.LoadToDosSuccess,
  props<{ toDos: ToDo[] }>()
);

export const loadToDosFailure = createAction(
  ToDoActions.LoadToDosFailure,
  props<{ error: any }>()
);

export const addToDo = createAction(
  ToDoActions.AddToDo,
  props<{ toDo: ToDo }>()
);

export const addToDoSuccess = createAction(
  ToDoActions.AddToDoSuccess,
  props<{ toDo: ToDo }>()
);

export const addToDoFailure = createAction(
  ToDoActions.AddToDosFailure,
  props<{ error: any }>()
);

export const setCategoryFilter = createAction(
  ToDoActions.SetCategoryFilter,
  props<{category: string}>()
);

export const setDoneFilter = createAction(
  ToDoActions.SetDoneFilter,
  props<{done: boolean|undefined}>()
);

export const toggleToDo = createAction(
  ToDoActions.ToggleToDo,
  props<{ toDo: ToDo }>()
);

export const updateToDo = createAction(
  ToDoActions.UpdateToDo,
  props<{ toDo: ToDo }>()
);

export const updateToDoSuccess = createAction(
  ToDoActions.UpdateToDoSuccess,
  props<{ toDo: ToDo }>()
);

export const updateToDoFailure = createAction(
  ToDoActions.UpdateToDoFailure,
  props<{ error: any }>()
);

export const deleteToDo = createAction(
  ToDoActions.DeleteToDo,
  props<{ id: number }>()
);

export const deleteToDoSuccess = createAction(
  ToDoActions.DeleteToDoSuccess,
  props<{ id: number }>()
);

export const deleteToDoFailure = createAction(
  ToDoActions.DeleteToDoFailure,
  props<{ error: any }>()
);
