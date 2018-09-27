import { Topic } from './../models/topic';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { TopicService } from './topic.service';
import { observable } from 'rxjs';

describe('TopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService, HttpClient, HttpHandler, HttpClientModule]
    });
  });

  it('should be created', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
  it('should get topic by id',
  async(inject([TopicService], (service: TopicService) => {
    expect(service.getTopicById.length).toEqual(1);
    console.log(service);
  })));
});
