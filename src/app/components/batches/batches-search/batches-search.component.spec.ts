import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesSearchComponent } from './batches-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('BatchesSearchComponent', () => {
  let component: BatchesSearchComponent;
  let fixture: ComponentFixture<BatchesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
