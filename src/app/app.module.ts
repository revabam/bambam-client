import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/template/navbar/navbar.component';
import { DashboardComponent } from './pages/tiles/dashboard/dashboard.component';
import { CalendarComponent } from './pages/tiles/calendar/calendar.component';
import { CurriculumEditorComponent } from './pages/tiles/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './pages/tiles/boom/boom.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CalendarComponent,
    CurriculumEditorComponent,
    BoomComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
