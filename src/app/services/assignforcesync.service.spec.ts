import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { AssignforcesyncService } from './assignforcesync.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../bam.test.module';

describe('AssignforcesyncService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  it('should be created', inject([AssignforcesyncService], (service: AssignforcesyncService) => {
    expect(service).toBeTruthy();
  }));
});
