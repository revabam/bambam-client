import { async, TestBed, inject } from '@angular/core/testing';

import { SubtopicService } from './subtopic.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../bam.test.module';

describe('SubtopicService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([SubtopicService], (service: SubtopicService) => {
    expect(service).toBeTruthy();
  }));
});
