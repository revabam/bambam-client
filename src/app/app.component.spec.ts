import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './routes/template/navbar/navbar.component';
import { DashboardComponent } from './routes/pages/dashboard/dashboard.component';
import { CalendarComponent } from './routes/pages/calendar/calendar.component';
import { CurriculumEditorComponent } from './routes/pages/curriculum-editor/curriculum-editor.component';
import { BoomComponent } from './routes/pages/boom/boom.component';
import { BrowserModule } from '../../node_modules/@angular/platform-browser';
import { appRoutes } from './routes/routes';
import { RouterModule } from '../../node_modules/@angular/router';
import { FormsModule } from '../../node_modules/@angular/forms';
import { BsDatepickerModule } from '../../node_modules/ngx-bootstrap/datepicker';
import { TimepickerModule } from '../../node_modules/ngx-bootstrap/timepicker';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        CalendarComponent,
        CurriculumEditorComponent,
        BoomComponent,
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { useHash: true}),
        FormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
      ],
      providers: [],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to bambam-client!');
  // }));
});
