import { HttpClient, HttpHandler} from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { BatchService } from './batch.service';

describe('BatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([BatchService], (service: BatchService) => {
    expect(service).toBeTruthy();
  }));
});
