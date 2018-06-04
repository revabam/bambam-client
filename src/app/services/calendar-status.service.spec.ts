import { async, TestBed, inject } from '@angular/core/testing';

import { CalendarStatusService } from './calendar-status.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../bam.test.module';

describe('StatusService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([CalendarStatusService], (service: CalendarStatusService) => {
    expect(service).toBeTruthy();
  }));
});
