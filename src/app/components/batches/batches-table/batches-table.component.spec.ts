import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesTableComponent } from './batches-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { Batch } from '../../../models/batch.model';

describe('BatchesTableComponent', () => {
  let component: BatchesTableComponent;
  let fixture: ComponentFixture<BatchesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if functionality within ngOnInit() executes as expected.
   */
  it ('should set filtered to an array with one empty batch', () => {
    const testBatch = new Batch(0, '', null, null, null, 0, 0);
    component.batches = [testBatch];
    component.ngOnInit();
    expect(component.filtered).toEqual([testBatch]);
  });
});
