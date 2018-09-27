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
import { CreateVersionComponent } from './routes/curriculum-editor/create-version/create-version.component';
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



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CalendarComponent,
    CurriculumEditorComponent,
    CreateVersionComponent,
    CreateCurriculumComponent,
    BoomComponent,
    LoginComponent,
    RegisterComponent,
    CalendarModalComponent,
    EventDuplicateModalComponent,
    StartMondayModalComponent,
    DialogViewComponent,
    UserInfoComponent,
    TopicsComponent,
    CurriculumViewComponent,
    CurriculumDayComponent
  ],
  imports: [
    NgbModule.forRoot(),
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
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
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot(),
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 60})
  ],
  entryComponents: [
    CalendarModalComponent,
    EventDuplicateModalComponent,
    UserInfoComponent,
    CreateCurriculumComponent,
    StartMondayModalComponent],
  providers: [
    UserService,
    CognitoService,
    BatchService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
