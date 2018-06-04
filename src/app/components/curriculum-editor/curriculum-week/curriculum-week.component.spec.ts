import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumWeekComponent } from './curriculum-week.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';

describe('CurriculumWeekComponent', () => {
  let component: CurriculumWeekComponent;
  let fixture: ComponentFixture<CurriculumWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
