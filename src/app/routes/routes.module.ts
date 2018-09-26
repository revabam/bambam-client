import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CurriculumEditorComponent } from './curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './boom/boom.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';
import { CreateVersionComponent } from './curriculum-editor/create-version/create-version.component';
import { EventDuplicateModalComponent } from './calendar/event-duplicate-modal/event-duplicate-modal.component';
import { CalendarModalComponent } from './calendar/calendar-modal/calendar-modal.component';
import { UserInfoComponent } from '../shared-components/user-info/user-info.component';
import { TopicsComponent } from './topics/topics.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

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
    },
    {
        path: 'forgotten/password',
        component: ForgottenPasswordComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' })
    ],
    declarations: [CreateVersionComponent, DialogViewComponent, EventDuplicateModalComponent, CalendarModalComponent, UserInfoComponent, TopicsComponent, ForgottenPasswordComponent],
    exports: [
        RouterModule
    ]
})
export class RoutesModule { }
