import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/pages/tiles/dashboard/dashboard.component';
import { CalendarComponent } from './app/pages/tiles/calendar/calendar.component';
import { CurriculumEditorComponent } from './app/pages/tiles/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './app/pages/tiles/boom/boom.component';

export const appRoutes: Routes = [
    // routes go here.
    {
        path: 'dashboard',
        component: DashboardComponent
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
