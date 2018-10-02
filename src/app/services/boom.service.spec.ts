import { TestBed, inject } from '@angular/core/testing';

import { BoomService } from './boom.service';

describe('BoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoomService]
    });
  });

  it('should be created', inject([BoomService], (service: BoomService) => {
    expect(service).toBeTruthy();
  }));
});
