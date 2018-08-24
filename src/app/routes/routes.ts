import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CreateVersionComponent } from './pages/create-version/create-version.component';
import { CurriculumEditorComponent } from './pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './pages/boom/boom.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DialogViewComponent } from './pages/dialog-view/dialog-view.component';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
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
        path: 'curriculum/create-version',
        component: CreateVersionComponent
    },

    {
        path: 'boom',
        component: BoomComponent
    },

    {
        path: 'curriculum/dialog-view',
        component: DialogViewComponent
    }
];
