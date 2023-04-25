import {ToDoState} from './to-do.state';
import {createReducer, on} from '@ngrx/store';
import {
  addToDo,
  addToDoSuccess,
  deleteToDo,
  loadToDos,
  loadToDosSuccess,
  setCategoryFilter, setDoneFilter,
  toggleToDo,
  updateToDo,
} from './to-do.actions';

const initialState: ToDoState = {
  toDos: [],
  category: '',
};

export const toDoReducer = createReducer(
  initialState,
  on(loadToDos, state => state),
  on(loadToDosSuccess, (state, {toDos}) => {
    return {...state, toDos};
  }),
  on(setCategoryFilter, (state, {category}) => {
    return {
      ...state,
      category
    };
  }),
  on(setDoneFilter, (state, {done}) => {
    return {
      ...state,
      done
    };
  }),
  on(addToDo, (state, {toDo}) => {
    return {
      ...state,
      toDos: [...state.toDos, toDo]
    };
  }),
  on(addToDoSuccess, (state, {toDo}) => {
    const updatedTodos = state.toDos.filter(item => item.id);
    updatedTodos.push(toDo);
    return {
      ...state,
      toDos: updatedTodos
    };
  }),
  on(toggleToDo, (state, {toDo}) => {
    return {
      ...state,
      toDos: state.toDos.map(item =>
        item.id === toDo.id ? toDo : item)
    };
  }),
  on(updateToDo, (state, {toDo}) => {
    return {
      ...state,
      toDos: state.toDos.map(item =>
        item.id === toDo.id ? toDo : item)
    };
  }),
  on(deleteToDo, (state, {id}) => {
    return {
      ...state,
      toDos: state.toDos.filter((item) => item.id !== id),
    };
  })
);
