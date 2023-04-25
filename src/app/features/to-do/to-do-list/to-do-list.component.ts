import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToDo, ToDoState} from '../store/to-do.state';
import {Store} from '@ngrx/store';
import {selectCategories, selectFilteredToDos} from '../store/to-do.selectors';
import * as ToDoActions from '../store/to-do.actions';
import {addToDo, deleteToDo, setCategoryFilter, setDoneFilter, toggleToDo, updateToDo} from '../store/to-do.actions';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {EditComponentModes, ToDoEditComponent} from '../to-do-edit/to-do-edit.component';
import Utils from '../../../lib/utils';

type StatusFilter = boolean|undefined;

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  // Define observables
  todos$: Observable<ToDo[]>;
  categories$: Observable<string[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedStatus$: BehaviorSubject<StatusFilter> = new BehaviorSubject<StatusFilter>(undefined);

  // Define component variables
  formGroup: FormGroup;
  page = 1;
  pageSize = 5;

  // Define getters and setters
  get selectedCategory(): string {
    return this.selectedCategory$.getValue();
  }
  set selectedCategory(cat: string) {
    this.selectedCategory$.next(cat);
  }
  get selectStatus(): StatusFilter {
    return this.selectedStatus$.getValue();
  }
  set selectStatus(status: StatusFilter) {
    this.selectedStatus$.next(status);
  }
  get todosControls(): FormArray {
    return this.formGroup.get('toDos') as FormArray;
  }

  constructor(
    private store: Store<{ todo: ToDoState }>,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formGroup = this.initFormGroup();
    this.todos$ = this.store.select(selectFilteredToDos);
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit(): void {
    this.startSubscriptions();
    this.loadTodos();
  }

  startSubscriptions(): void {
    this.todos$
      .pipe(
        filter(arr => arr.length > 0),
        tap((toDos) => {
          // Add new form groups to form array for each to-do item
          toDos.forEach(toDo => this.addToDoFormGroup(toDos.indexOf(toDo), toDo));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Set a new filter each time the selectedCategory$ observable emits a new value;
    this.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.setCategoryFilter(val));

    // Set a new status filter each time the selectedStatus$ observable emits a new value;
    this.selectedStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => this.setStatusFilter(status));
  }

  initFormGroup(): FormGroup {
    return this.formBuilder.group({
      toDos: this.formBuilder.array([])
    });
  }

  loadTodos(): void {
    this.store.dispatch(ToDoActions.loadToDos());
  }

  createToDo(toDo: ToDo): void {
    this.store.dispatch(addToDo({toDo}));
  }

  toggleToDo(toDo: ToDo): void {
    const updatedToDo: ToDo = {
      ...toDo,
      done: !!toDo.done ? false : Utils.formatDate(new Date())
    };
    this.store.dispatch(toggleToDo({toDo: updatedToDo}));
  }

  updateToDo(updatedToDo: ToDo): void {
    this.store.dispatch(updateToDo({toDo: updatedToDo}));
  }

  deleteToDo(id: number): void {
    this.store.dispatch(deleteToDo({id}));
  }

  private addToDoFormGroup(index: number, toDo?: ToDo): void {
    const formGroup = this.formBuilder.group({
      done: [toDo ? !!toDo.done : false]
    });
    this.todosControls.removeAt(index);
    this.todosControls.insert(index, formGroup);
  }

  openEditModal(toDo: ToDo): void {
    const modalOpts: NgbModalOptions = {
      windowClass: 'custom-styles',
      centered: true
    };
    const modalRef = this.modalService.open(ToDoEditComponent, modalOpts);
    modalRef.componentInstance.toDo = toDo;
    modalRef.componentInstance.mode = EditComponentModes.Update;
    modalRef.closed
      .subscribe((data: { payload: ToDo }) => {
        this.updateToDo(data.payload);
      });
  }

  openCreateModal(): void {
    const modalOpts: NgbModalOptions = {
      windowClass: 'custom-styles',
      centered: true
    };
    const modalRef = this.modalService.open(ToDoEditComponent, modalOpts);
    modalRef.componentInstance.toDo = {};
    modalRef.componentInstance.mode = EditComponentModes.Create;
    modalRef.closed.subscribe((data: { payload: ToDo }) => {
      this.createToDo(data.payload);
    });
  }

  setCategoryFilter(category: string): void {
    this.store.dispatch(setCategoryFilter({category}));
  }

  setStatusFilter(status: StatusFilter): void {
    this.store.dispatch(setDoneFilter({done: status}));
  }

  getFormGroupIndex(i: number): number {
    // Because the original array gets sliced by the pagination widget,
    // indexes in the ngFor need to be adjusted based on the current page and the pages size;
    return this.page === 1 ? i : i + (this.pageSize * (this.page - 1));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
