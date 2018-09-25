import { DashboardComponent } from '../routes/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { CalendarComponent } from '../routes/calendar/calendar.component';
import { CreateVersionComponent } from '../routes/curriculum-editor/create-version/create-version.component';
import { CurriculumEditorComponent } from '../routes/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from '../routes/boom/boom.component';
import { LoginComponent } from '../routes/login/login.component';
import { RegisterComponent } from '../routes/register/register.component';
import { DialogViewComponent } from '../routes/dialog-view/dialog-view.component';

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
