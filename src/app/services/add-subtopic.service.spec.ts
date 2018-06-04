import { async, TestBed, inject } from '@angular/core/testing';

import { AddSubtopicService } from './add-subtopic.service';
import { Dependencies } from '../bam.test.module';

describe('AddSubtopicService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([AddSubtopicService], (service: AddSubtopicService) => {
    expect(service).toBeTruthy();
  }));
});
