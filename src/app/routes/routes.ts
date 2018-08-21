import { Routes } from '@angular/router';
import { AppComponent } from '../../app/app.component';
import { DashboardComponent } from '../../app/routes/pages/dashboard/dashboard.component';
import { CalendarComponent } from '../../app/routes/pages/calendar/calendar.component';
import { CreateVersionComponent } from '../../app/routes/pages/create-version/create-version.component';
import { CurriculumEditorComponent } from '../../app/routes/pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from '../../app/routes/pages/boom/boom.component';
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
