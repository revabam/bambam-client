
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
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { CurriculumViewComponent } from './curriculum-editor/curriculum-view/curriculum-view.component';

export const appRoutes: Routes = [
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
            path: 'curriculum/views',
            component: CurriculumViewComponent
        },
    {
        path: 'boom',
        component: BoomComponent
    },
    {
        path: 'forgotten/password',
        component: ForgottenPasswordComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }
];
