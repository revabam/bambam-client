import { CurriculumViewComponent } from './routes/curriculum-editor/curriculum-view/curriculum-view.component';
import { CreateCurriculumComponent } from './routes/curriculum-editor/create-curriculum/create-curriculum.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatTreeModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FlatpickrModule } from 'angularx-flatpickr';
import { appRoutes } from './routes/routes';
import { AppComponent } from './app.component';
import { BoomComponent } from './routes/boom/boom.component';
import { CurriculumEditorComponent } from './routes/curriculum-editor/curriculum-editor.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { UserService } from './services/user.service';
import { BatchService } from './services/batch.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserIdleModule } from 'angular-user-idle';
import { CognitoService } from './services/cognito.service';
import { EventDuplicateModalComponent } from './routes/calendar/event-duplicate-modal/event-duplicate-modal.component';
import { DialogViewComponent } from './routes/dialog-view/dialog-view.component';
import { CalendarComponent } from './routes/calendar/calendar.component';
import { CalendarModalComponent } from './routes/calendar/calendar-modal/calendar-modal.component';
import { UserInfoComponent } from './shared-components/user-info/user-info.component';
import { TopicsComponent } from './routes/topics/topics.component';
import { CurriculumDayComponent } from './routes/curriculum-editor/curriculum-day/curriculum-day.component';
import { StartMondayModalComponent } from './routes/calendar/start-monday-modal/start-monday-modal.component';
import { ChartsModule } from 'ng2-charts';
import { ForgottenPasswordComponent } from './routes/forgotten-password/forgotten-password.component';
import { CurriculumWeekComponent } from './routes/curriculum-editor/curriculum-week/curriculum-week.component';
import { TopicPoolComponent } from './routes/curriculum-editor/topic-pool/topic-pool.component';
import { NgDragDropModule } from 'ng-drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CalendarComponent,
    CurriculumEditorComponent,
    CreateCurriculumComponent,
    BoomComponent,
    LoginComponent,
    RegisterComponent,
    CalendarModalComponent,
    DialogViewComponent,
    EventDuplicateModalComponent,
    StartMondayModalComponent,
    DialogViewComponent,
    UserInfoComponent,
    TopicsComponent,
    CurriculumViewComponent,
    CurriculumDayComponent,
    CurriculumWeekComponent,
    TopicPoolComponent,
    ForgottenPasswordComponent
  ],
  imports: [
    ChartsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    DragDropModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot(),
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 60}),
    ChartsModule
  ],
  exports: [
  ],
  entryComponents: [
    CalendarModalComponent,
    EventDuplicateModalComponent,
    UserInfoComponent,
    CreateCurriculumComponent,
    StartMondayModalComponent,
    DialogViewComponent
  ],
  providers: [
    UserService,
    CognitoService,
    BatchService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
