import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ToDoService} from '../to-do.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addToDo,
  addToDoFailure,
  addToDoSuccess,
  deleteToDo,
  deleteToDoFailure,
  deleteToDoSuccess,
  loadToDos,
  loadToDosFailure,
  loadToDosSuccess,
  setDoneFilter,
  toggleToDo,
  updateToDo,
  updateToDoFailure,
  updateToDoSuccess
} from './to-do.actions';

@Injectable()
export class ToDoEffects {
  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadToDos),
      mergeMap(() => {
        return this.todoService.getToDos().pipe(
          map((toDos) => loadToDosSuccess({toDos})),
          catchError((error) => of(loadToDosFailure({error})))
        );
      })
    );
  });

  toggleTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(toggleToDo),
      mergeMap((props) => {
        return this.todoService.updateToDo(props.toDo).pipe(
          map((toDo) => updateToDoSuccess({toDo})),
          catchError((error) => of(updateToDoFailure({error})))
        );
      })
    );
  });

  updateTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateToDo),
      mergeMap((props) => {
        return this.todoService.updateToDo(props.toDo).pipe(
          map((toDo) => updateToDoSuccess({toDo})),
          catchError((error) => of(updateToDoFailure({error})))
        );
      })
    );
  });

  deleteTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteToDo),
      mergeMap((props) => {
        return this.todoService.deleteToDo(props.id).pipe(
          map(() => deleteToDoSuccess({id: props.id})),
          catchError((error) => of(deleteToDoFailure({error})))
        );
      })
    );
  });

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToDo),
      mergeMap((props) => {
        return this.todoService.addToDo(props.toDo).pipe(
          map((toDo) => addToDoSuccess({toDo})),
          catchError((error) => of(addToDoFailure({error})))
        );
      })
    );
  });

  filterCompletedToDos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setDoneFilter),
      mergeMap((props) => {
        return this.todoService.getFilteredToDos(props.done).pipe(
          map((toDos) => loadToDosSuccess({toDos})),
          catchError((error) => of(loadToDosFailure({error})))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private todoService: ToDoService
  ) {}
}
