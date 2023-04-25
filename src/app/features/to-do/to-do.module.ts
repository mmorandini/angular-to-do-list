import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDoRoutingModule} from './to-do-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { ToDoEditComponent } from './to-do-edit/to-do-edit.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';


@NgModule({
  declarations: [
    ToDoEditComponent,
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ToDoModule {
}
