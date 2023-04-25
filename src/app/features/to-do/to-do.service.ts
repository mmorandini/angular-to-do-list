import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ToDo} from './store/to-do.state';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  getFilteredToDos(done: boolean | undefined): Observable<ToDo[]> {
    const query = (done === null ? '' : (!!done ? '?done_ne=false' : '?done=false'));
    return this.http.get<ToDo[]>(this.apiUrl + query);
  }

  addToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, toDo);
  }

  updateToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.patch<ToDo>(`${this.apiUrl}/${toDo.id}`, toDo);
  }

  deleteToDo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
