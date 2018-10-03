import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDayComponent } from './curriculum-day.component';

describe('CurriculumDayComponent', () => {
  let component: CurriculumDayComponent;
  let fixture: ComponentFixture<CurriculumDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
