import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpEvent} from '@angular/common/http';
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

  it('should return a trainer by ID', function() {
    const fakeHandle = { handle: () => new Observable<HttpEvent<any>>()};
    const trainer = new BatchService(new HttpClient(fakeHandle as HttpHandler));
    spyOn(trainer, 'getBatchesByTrainerId');
    trainer.getBatchesByTrainerId(1);
    expect(trainer.getBatchesByTrainerId).toBeDefined();
  });
  it('should create a batch ', function() {
    const batch = new BatchService(null);
    spyOn(batch, 'createBatch');
    batch.createBatch(name);
    expect(batch.createBatch).toHaveBeenCalled();
  });
});
