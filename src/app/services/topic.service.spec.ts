import { Topic } from './../models/topic';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { TopicService } from './topic.service';
import { Observable } from 'rxjs';

describe('TopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService, HttpClient, HttpHandler, HttpClientModule]
    });
  });

  it('should be created', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));

  // Testing methods within topic service
  it('should get topic by id',
  async(inject([TopicService], (service: TopicService) => {
    expect(service.getTopicById.length).toEqual(1);
  })));

});
