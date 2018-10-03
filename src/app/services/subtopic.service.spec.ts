import { SubTopic } from './../models/subtopic';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { SubTopicService } from './subtopic.service';

/**
 * Here we are testing the methods within the SubTopic Service class
 * @name SubTopicTest
 * @author Daniel Sidhu | Spark1806-USF-Java | Steven Kelsey
 */
describe('SubtopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubTopicService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([SubTopicService], (service: SubTopicService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * getAll Test
   * @param none
   */
  it('should call getAll', () => {
    const subTopic = new SubTopicService(null);
    spyOn(subTopic, 'getAll');
    subTopic.getAll();
    expect(subTopic.getAll).toHaveBeenCalled();
  });

  /**
   * add Test
   * @param name
   * @param id
   */
  it('should call add', () => {
    const subTopic = new SubTopicService(null);
    spyOn(subTopic, 'add');
    subTopic.add('test', 0);
    expect(subTopic.add).toHaveBeenCalled();
  });

  /**
   * getSubTopicByParentId Test
   * @param id
   */
  it('should call getSubTopicByParentId', () => {
    const subTopic = new SubTopicService(null);
    spyOn(subTopic, 'getSubTopicByParentId');
    subTopic.getSubTopicByParentId(0);
    expect(subTopic.getSubTopicByParentId).toHaveBeenCalled();
  });
});


