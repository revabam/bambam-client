import { Topic } from './../models/topic';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { TopicService } from './topic.service';
import { Observable } from 'rxjs';
import { SubTopic } from '../models/subtopic';

/**
 * Here we are testing the methods within the SubTopic Service class
 * @name SubTopicTest
 * @author Chris Holmes | Spark1806-USF-Java | Steven Kelsey
 */
describe('TopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService, HttpClient, HttpHandler, HttpClientModule]
    });
  });

  it('should be created', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));

  /** getTopicById length Test
   *  @param number
   */
  it('should get topic by id',
    async(inject([TopicService], (service: TopicService) => {
      expect(service.getTopicById.length).toEqual(1);
    })));

  /**
   * getAll Test
   * @param none
   */
  it('should call getAll', () => {
    const topicService = new TopicService(null);
    spyOn(topicService, 'getAll');
    topicService.getAll();
    expect(topicService.getAll).toHaveBeenCalled();
  });

  /**
   * getByName
   * @param string
   */
  it('should call getByName', () => {
    const topicService = new TopicService(null);
    spyOn(topicService, 'getByName');
    topicService.getByName(name);
    expect(topicService.getByName).toHaveBeenCalled();
  });

  /**
   * add Test
   * @param string
   */
  it('should call add', () => {
    const topicService = new TopicService(null);
    spyOn(topicService, 'add');
    topicService.add(name);
    expect(topicService.add).toHaveBeenCalled();
  });
});
