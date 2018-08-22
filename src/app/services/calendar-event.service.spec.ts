import { TestBed, inject } from '@angular/core/testing';

import { CalendarEventService } from './calendar-event.service';

describe('CalendarEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarEventService]
    });
  });

  it('should be created', inject([CalendarEventService], (service: CalendarEventService) => {
    expect(service).toBeTruthy();
  }));
});
