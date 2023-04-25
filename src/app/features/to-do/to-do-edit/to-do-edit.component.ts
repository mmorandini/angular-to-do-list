import { Component } from '@angular/core';

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
export class ToDoEditComponent {

}
