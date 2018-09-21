import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { BoomComponent } from './routes/pages/boom/boom.component';
import { CalendarComponent, CalendarModalComponent } from './routes/pages/calendar/calendar.component';
import { CreateVersionComponent } from './routes/pages/create-version/create-version.component';
import { CurriculumEditorComponent } from './routes/pages/curriculum-editor/curriculum-editor.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/pages/dashboard/dashboard.component';
import { LoginComponent } from './routes/pages/login/login.component';
import { RegisterComponent } from './routes/pages/register/register.component';
import { NavbarComponent } from './routes/template/navbar/navbar.component';
import { UserService } from './services/user.service';
import { BatchService } from './services/batch.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserIdleModule } from 'angular-user-idle';
import { CognitoService } from './services/cognito.service';
import { DialogViewComponent } from './routes/pages/dialog-view/dialog-view.component';
import { UserInfoComponent } from './routes/template/user-info/user-info.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CalendarComponent,
    CurriculumEditorComponent,
    CreateVersionComponent,
    BoomComponent,
    LoginComponent,
    RegisterComponent,
    CalendarModalComponent,
    DialogViewComponent,
    UserInfoComponent
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
    RouterModule.forRoot(appRoutes),
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
  entryComponents: [CalendarModalComponent,
  UserInfoComponent],
  providers: [
    UserService,
    CognitoService,
    BatchService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
