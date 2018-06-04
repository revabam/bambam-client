import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchProgressBarComponent } from './batch-progress-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('BatchProgressBarComponent', () => {
  let component: BatchProgressBarComponent;
  let fixture: ComponentFixture<BatchProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
