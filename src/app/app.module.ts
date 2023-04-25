import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {toDoReducer} from './features/to-do/store/to-do.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ToDoEffects} from './features/to-do/store/to-do.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({todo: toDoReducer}),
    EffectsModule.forRoot([ToDoEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Angular todo App',
    }),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
