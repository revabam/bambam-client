import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../app/routes/routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './routes/template/navbar/navbar.component';
import { DashboardComponent } from './routes/pages/dashboard/dashboard.component';
import { CalendarComponent } from './routes/pages/calendar/calendar.component';
import { CurriculumEditorComponent } from './routes/pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './routes/pages/boom/boom.component';

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
export class AppModule {}
