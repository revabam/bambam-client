import { Routes } from '@angular/router';
import { AppComponent } from '../../app/app.component';
import { DashboardComponent } from '../../app/routes/pages/dashboard/dashboard.component';
import { CalendarComponent } from '../../app/routes/pages/calendar/calendar.component';
import { CurriculumEditorComponent } from '../../app/routes/pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from '../../app/routes/pages/boom/boom.component';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes: Routes = [
    // routes go here.
    {
        path: 'dashboard',
        component: DashboardComponent
    },

    {
        path: 'login',
        component: LoginComponent
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
        path: '**',
        pathMatch: 'full',
        redirectTo: '/'
    }
];
