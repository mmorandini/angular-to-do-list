import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDoService } from './to-do.service';
import { ToDo } from './store/to-do.state';
import { environment } from '../../../environments/environment';

describe('ToDoService', () => {
  let httpMock: HttpTestingController;
  let service: ToDoService;
  const apiUrl = environment.apiUrl + '/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToDoService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ToDoService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToDos', () => {
    it('should return an Observable<ToDo[]>', () => {
      const dummyToDos: ToDo[] = [
        { id: 1, description: 'Buy groceries', label: 'my-label', category: 'my-category', done: false },
        { id: 2, description: 'Buy groceries', label: 'my-label', category: 'my-category', done: false }
      ];

      service.getToDos().subscribe((toDos) => {
        expect(toDos.length).toBe(2);
        expect(toDos).toEqual(dummyToDos);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dummyToDos);
    });
  });

  describe('addToDo', () => {
    it('should return an Observable<ToDo>', () => {
      const dummyToDo: ToDo = { id: 1, description: 'Buy groceries', label: 'my-label', category: 'my-category', done: false };

      service.addToDo(dummyToDo).subscribe((toDo) => {
        expect(toDo).toEqual(dummyToDo);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(dummyToDo);
    });
  });

  describe('updateToDo', () => {
    it('should return an Observable<ToDo>', () => {
      const dummyToDo: ToDo = { id: 1, description: 'Buy groceries', label: 'my-label', category: 'my-category', done: false };

      service.updateToDo(dummyToDo).subscribe((toDo) => {
        expect(toDo).toEqual(dummyToDo);
      });

      const req = httpMock.expectOne(`${apiUrl}/${dummyToDo.id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(dummyToDo);
    });
  });

  describe('deleteToDo', () => {
    it('should return an Observable<void>', () => {
      const dummyId = 1;

      service.deleteToDo(dummyId).subscribe(() => {
        expect().nothing();
      });

      const req = httpMock.expectOne(`${apiUrl}/${dummyId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
