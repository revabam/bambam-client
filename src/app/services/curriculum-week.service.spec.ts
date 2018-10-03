import { TestBed, inject } from '@angular/core/testing';

import { CurriculumWeekService } from './curriculum-week.service';

describe('CurriculumWeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculumWeekService]
    });
  });

  it('should be created', inject([CurriculumWeekService], (service: CurriculumWeekService) => {
    expect(service).toBeTruthy();
  }));
});
