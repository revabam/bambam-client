import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CurriculumEditorComponent } from './pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './pages/boom/boom.component';
import { CreateVersionComponent } from './pages/create-version/create-version.component';
import { DialogViewComponent } from './pages/dialog-view/dialog-view.component';
import { UserInfoComponent } from './template/user-info/user-info.component';

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
  declarations: [CreateVersionComponent, DialogViewComponent, UserInfoComponent],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
