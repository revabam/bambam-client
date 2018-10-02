import { TestBed, inject } from '@angular/core/testing';

import { DaySubtopicService } from './day-subtopic.service';

describe('DaySubtopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaySubtopicService]
    });
  });

  it('should be created', inject([DaySubtopicService], (service: DaySubtopicService) => {
    expect(service).toBeTruthy();
  }));
});
