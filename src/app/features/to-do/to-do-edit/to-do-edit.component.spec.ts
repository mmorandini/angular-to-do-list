import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoEditComponent, EditComponentModes } from './to-do-edit.component';
import { ToDo } from '../store/to-do.state';

describe('ToDoEditComponent', () => {
  let component: ToDoEditComponent;
  let fixture: ComponentFixture<ToDoEditComponent>;
  let formBuilder: FormBuilder;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoEditComponent ],
      providers: [ FormBuilder, NgbActiveModal ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoEditComponent);
    component = fixture.componentInstance;
    component.toDo = {
      id: 1,
      label: 'Test To Do',
      description: 'This is a test to do.',
      category: 'Test Category',
      done: false,
    };
    formBuilder = TestBed.inject(FormBuilder);
    activeModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group', () => {
    expect(component.formGroup).toBeDefined();
  });

  it('should have valid initial form values when in create mode', () => {
    component.mode = EditComponentModes.Create;
    component.toDo = undefined;
    component.ngOnInit();
    expect(component.controls['label'].value).toBe('');
    expect(component.controls['description'].value).toBe('');
    expect(component.controls['category'].value).toBe('');
  });

  it('should have valid initial form values when in update mode', () => {
    const todo: ToDo = {
      id: 1,
      label: 'Test Label',
      description: 'Test Description',
      category: 'Test Category',
      done: false
    };
    component.mode = EditComponentModes.Update;
    component.toDo = todo;
    component.ngOnInit();
    expect(component.controls['label'].value).toBe(todo.label);
    expect(component.controls['description'].value).toBe(todo.description);
    expect(component.controls['category'].value).toBe(todo.category);
  });

  it('should cancel the edit and dismiss the modal', () => {
    spyOn(activeModal, 'dismiss');
    component.cancel();
    expect(activeModal.dismiss).toHaveBeenCalled();
  });

  it('should submit the form and close the modal if the form is valid', () => {
    spyOn(activeModal, 'close');
    const todo: ToDo = {
      id: 1,
      label: 'Test Label',
      description: 'Test Description',
      category: 'Test Category',
      done: false
    };
    component.toDo = todo;
    component.ngOnInit();
    component.submit();
    expect(activeModal.close).toHaveBeenCalledWith({payload: {...todo, ...component.formGroup.value}});
  });

  it('should mark all form fields as touched if the form is invalid', () => {
    component.formGroup.setErrors({invalid: true});
    spyOn(component.formGroup, 'markAllAsTouched');
    component.submit();
    expect(component.formGroup.markAllAsTouched).toHaveBeenCalled();
  });
});
