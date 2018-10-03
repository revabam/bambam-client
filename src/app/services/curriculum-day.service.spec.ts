import { TestBed, inject } from '@angular/core/testing';

import { CurriculumDayService } from './curriculum-day.service';

describe('CurriculumDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculumDayService]
    });
  });

  it('should be created', inject([CurriculumDayService], (service: CurriculumDayService) => {
    expect(service).toBeTruthy();
  }));
});
