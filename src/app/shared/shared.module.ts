import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

const BOOTSTRAP_MODULES = [
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTooltipModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ...BOOTSTRAP_MODULES
  ],
  exports: [
    ...BOOTSTRAP_MODULES
  ]
})
export class SharedModule { }
