import { TestBed, inject } from '@angular/core/testing';

import { CalendarSubtopicService } from './calendar-subtopic.service';

describe('CalendarSubtopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarSubtopicService]
    });
  });

  it('should be created', inject([CalendarSubtopicService], (service: CalendarSubtopicService) => {
    expect(service).toBeTruthy();
  }));
});
