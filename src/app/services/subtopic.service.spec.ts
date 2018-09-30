import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { SubTopicService } from './subtopic.service';

describe('SubtopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubTopicService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([SubTopicService], (service: SubTopicService) => {
    expect(service).toBeTruthy();
  }));
});
