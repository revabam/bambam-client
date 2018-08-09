import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { BsDatepickerModule } from '../../../../../node_modules/ngx-bootstrap/datepicker';
import { TimepickerModule } from '../../../../../node_modules/ngx-bootstrap/timepicker';
import { FormsModule } from '../../../../../node_modules/@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have <h3> of the title', () => {
    component = fixture.componentInstance;
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain(component.title);
  });
});
