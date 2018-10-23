import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDayComponent } from './curriculum-day.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CurriculumDayComponent', () => {
  let component: CurriculumDayComponent;
  let fixture: ComponentFixture<CurriculumDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDayComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
