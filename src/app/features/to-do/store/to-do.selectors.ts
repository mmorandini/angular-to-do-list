import {ToDoState} from './to-do.state';
import {createSelector} from '@ngrx/store';

export const selectToDos = (state: {todo: ToDoState}) => {
  return state.todo.toDos;
};

export const selectCategoryFilter = (state: {todo: ToDoState}) => {
  return state.todo.category;
};

export const selectCategories = (state: {todo: ToDoState}) => {
  return [...new Set(state.todo.toDos.map(item => item.category))];
};

export const selectFilteredToDos = createSelector(
  selectToDos,
  selectCategoryFilter,
  (toDos, filter) => {
    if (!filter) {
      return toDos;
    } else {
      return toDos.filter(item => item.category.toLowerCase() === filter.toLowerCase());
    }
  }
);
