import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModal, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ToDo, ToDoState } from '../store/to-do.state';
import { ToDoListComponent } from './to-do-list.component';
import {HttpClient} from '@angular/common/http';
import {addToDo, deleteToDo, setCategoryFilter, setDoneFilter, ToDoActions, updateToDo} from '../store/to-do.actions';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let mockStore: Store<{ todo: ToDoState }>;
  let mockModalService: Partial<NgbModal>;
  let mockActiveModalService: Partial<NgbActiveModal>;
  let mockHttpClient: Partial<HttpClient>;

  beforeEach(async () => {
    mockStore = {
      select: () => of([]),
      dispatch: () => {
      },
    } as any;

    mockModalService = {
      open: () => {
        return {
          componentInstance: {
            toDo: {},
            mode: '',
          },
          closed: of({payload: {}}),
        } as NgbModalRef;
      },
    };

    mockActiveModalService = {};

    mockHttpClient = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [ToDoListComponent],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: NgbModal, useValue: mockModalService},
        {provide: NgbActiveModal, useValue: mockActiveModalService},
        {provide: HttpClient, useValue: mockHttpClient}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected category', () => {
    component.selectedCategory = 'category';
    expect(component.selectedCategory).toEqual('category');
  });

  it('should toggle to-do so that "done" becomes truthy', () => {
    const mockToDo: ToDo = {id: 1, label: 'test', description: 'test test', category: '', done: false};
    spyOn(mockStore, 'dispatch').and.stub();
    component.toggleToDo(mockToDo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: ToDoActions.ToggleToDo,
      toDo: jasmine.objectContaining({
        id: mockToDo.id,
        description: mockToDo.description,
        done: jasmine.truthy()
      })
    }));
  });

  it('should toggle to-do so that "done" becomes false', () => {
    const mockToDo: ToDo = {id: 1, label: 'test', description: 'test test', category: '', done: '20-04-2023'};
    spyOn(mockStore, 'dispatch').and.stub();
    component.toggleToDo(mockToDo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: ToDoActions.ToggleToDo,
      toDo: jasmine.objectContaining({
        id: mockToDo.id,
        description: mockToDo.description,
        done: false
      })
    }));
  });

  it('should update to-do', () => {
    const mockToDo: ToDo = {id: 1, label: 'test', description: 'test test', category: '', done: false};
    spyOn(mockStore, 'dispatch').and.stub();
    component.updateToDo(mockToDo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(updateToDo({toDo: mockToDo}));
  });

  it('should create to-do', () => {
    const mockToDo: ToDo = {id: 1, label: 'test', description: 'test test', category: '', done: false};
    spyOn(mockStore, 'dispatch').and.stub();
    component.createToDo(mockToDo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(addToDo({toDo: mockToDo}));
  });

  it('should delete to-do', () => {
    spyOn(mockStore, 'dispatch').and.stub();
    const testId = 1;
    component.deleteToDo(testId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteToDo({id: testId}));
  });

  it('should open edit modal', () => {
    // @ts-ignore
    spyOn(mockModalService, 'open').and.callThrough();
    component.openEditModal({id: 1, label: 'test', description: 'test test', category: '', done: false});
    expect(mockModalService.open).toHaveBeenCalled();
  });

  it('should open create modal', () => {
    // @ts-ignore
    spyOn(mockModalService, 'open').and.callThrough();
    component.openCreateModal();
    expect(mockModalService.open).toHaveBeenCalled();
  });

  it('should set category filter', () => {
    spyOn(mockStore, 'dispatch');
    const category = 'test';
    component.setCategoryFilter(category);
    expect(mockStore.dispatch).toHaveBeenCalledWith(setCategoryFilter({ category }));
  });

  it('should set status filter', () => {
    spyOn(mockStore, 'dispatch');
    const status = true;
    component.setStatusFilter(status);
    expect(mockStore.dispatch).toHaveBeenCalledWith(setDoneFilter({done: status}));
  });

  it('should return the correct index when getFormGroupIndex is called and page is 1', () => {
    component.page = 1;
    component.pageSize = 5;
    expect(component.getFormGroupIndex(3)).toBe(3);
  });

  it('should return the correct index when getFormGroupIndex is called and page is greater than 1', () => {
    component.page = 3;
    component.pageSize = 5;
    expect(component.getFormGroupIndex(3)).toBe(13);
  });
});


