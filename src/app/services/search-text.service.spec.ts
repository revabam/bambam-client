import { async, TestBed, inject } from '@angular/core/testing';

import { SearchTextService } from './search-text.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../bam.test.module';

describe('SearchTextService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([SearchTextService], (service: SearchTextService) => {
    expect(service).toBeTruthy();
  }));
});
