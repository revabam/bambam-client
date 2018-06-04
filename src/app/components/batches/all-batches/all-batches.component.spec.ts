import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';
import { AllBatchesComponent } from './all-batches.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Dependencies } from '../../../bam.test.module';
import { By } from '@angular/platform-browser';


describe('AllBatchesComponent', () => {
  let component: AllBatchesComponent;
  let fixture: ComponentFixture<AllBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
