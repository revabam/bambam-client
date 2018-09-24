import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../routes/dashboard/dashboard.component';
import { CalendarComponent } from '../routes/calendar/calendar.component';
import { CreateVersionComponent } from '../routes/curriculum-editor/create-version/create-version.component';
import { CurriculumEditorComponent } from '../routes/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from '../routes/boom/boom.component';
import { LoginComponent } from '../routes/login/login.component';
import { RegisterComponent } from '../routes/register/register.component';
import { DialogViewComponent } from '../routes/dialog-view/dialog-view.component';

const ROUTES: Routes = [
  {
      path: 'dashboard',
      component: DashboardComponent
  },

  {
      path: 'login',
      component: LoginComponent
  },

  {
      path: 'register',
      component: RegisterComponent
  },

  {
      path: 'calendar',
      component: CalendarComponent
  },

  {
      path: 'curriculum/editor',
      component: CurriculumEditorComponent
  },

  {
      path: 'boom',
      component: BoomComponent
  },
  {
      path: 'curriculum/editor',
      component: DialogViewComponent
  },
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})
  ],
  declarations: [CreateVersionComponent, DialogViewComponent],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
