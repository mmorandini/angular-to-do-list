import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellComponent} from './shell/shell.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ShellComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ShellComponent
  ]
})
export class CoreModule {
}
