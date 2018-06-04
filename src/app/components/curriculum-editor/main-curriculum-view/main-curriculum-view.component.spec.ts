import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCurriculumViewComponent } from './main-curriculum-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';

describe('MainCurriculumViewComponent', () => {
  let component: MainCurriculumViewComponent;
  let fixture: ComponentFixture<MainCurriculumViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCurriculumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
