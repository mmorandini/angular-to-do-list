import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToDo} from '../store/to-do.state';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export enum EditComponentModes {
  Create = 0,
  Update = 1
}

interface ToDoForm {
  label: string;
  description: string;
  category?: string;
}

@Component({
  selector: 'app-to-do-edit',
  templateUrl: './to-do-edit.component.html',
  styleUrls: ['./to-do-edit.component.scss']
})
export class ToDoEditComponent implements OnInit {
  @Input() toDo: ToDo | undefined;
  @Input() mode: EditComponentModes | undefined;
  formGroup: FormGroup;

  get controls() {
    return this.formGroup.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return this.formBuilder.group({
      label: [this.toDo ? this.toDo.label : '', [Validators.required]],
      description: [this.toDo ? this.toDo.description : '', [Validators.required, Validators.maxLength(300)]],
      category: [this.toDo ? this.toDo.category : '']
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  submit(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const formData: ToDoForm = this.formGroup.value;
    this.activeModal.close({payload: {...this.toDo, ...formData, done: false}});
  }

}
