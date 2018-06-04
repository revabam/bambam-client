import { async, TestBed, inject } from '@angular/core/testing';

import { DragndropService } from './dragndrop.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../bam.test.module';

describe('DragndropService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([DragndropService], (service: DragndropService) => {
    expect(service).toBeTruthy();
  }));
});
