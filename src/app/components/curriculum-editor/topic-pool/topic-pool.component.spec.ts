import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPoolComponent } from './topic-pool.component';
import { NO_ERRORS_SCHEMA, Component, DebugElement } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { Topic } from '../../../models/topic.model';
import { SubtopicService } from '../../../services/subtopic.service';
import { Observable, of } from 'rxjs';
import { SubtopicCurric } from '../../../models/subtopicCurric.model';
import { SearchTextService } from '../../../services/search-text.service';
import { DragndropService } from '../../../services/dragndrop.service';
import { TopicName } from '../../../models/topicname.model';
import { TopicService } from '../../../services/topic.service';
import { AlertService } from '../../../services/alert.service';
import { By } from '@angular/platform-browser';
import { CurriculumService } from '../../../services/curriculum.service';

describe('TopicPoolComponent', () => {
  let component: TopicPoolComponent;
  let fixture: ComponentFixture<TopicPoolComponent>;

  let parentTopic: Topic;
  let notParentTopic: Topic;

  let curricService: CurriculumService = null;

  // Used to tell the spy on searchTextService.getMessage() what it should return during a unit test.
  let typeReturn: string = null;
  // Used to tell curriculumService.getAllTopicPool what type of observable to return
  let getTopicErrorObserv = false;

  // Spies for checking if a function on an other inaccessible service has been called.
  let searchTextSendSpy: jasmine.Spy = null;
  let dndSendSpy: jasmine.Spy = null;
  let alertSpy: jasmine.Spy = null;
  let subtopicAddSubtopicSpy: jasmine.Spy = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {

    parentTopic = { topicID: 256, topicName: 'Parent Topic' };
    notParentTopic = { topicID: 512, topicName: 'notParentTopic' };

    const topicService: TopicService = TestBed.get(TopicService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    const searchTextService: SearchTextService = TestBed.get(SearchTextService);
    const dndService: DragndropService = TestBed.get(DragndropService);
    const alertService: AlertService = TestBed.get(AlertService);
    const curriculumService: CurriculumService = TestBed.get(CurriculumService);

    spyOn(topicService, 'addTopicName').and.callFake((value: string) => {
      const ret: TopicName = { id: 1, name: value };
      return of(ret);
    });

    spyOn(subtopicService, 'getAllSubtopics').and.returnValue(of<SubtopicCurric[]>([
      {
        date: { day: 0, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'inProgress',
        subtopicId: 0, subtopicName: 'Subtopic 1'
      },
      {
        date: { day: 1, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'complete',
        subtopicId: 0, subtopicName: 'Subtopic 2'
      },
      {
        date: { day: 2, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'upcoming',
        subtopicId: 0, subtopicName: 'Subtopic 3'
      },
    ]
    ));

    subtopicAddSubtopicSpy = spyOn(subtopicService, 'addSubTopicName').and.callFake((stName: string, topicId: number, typeId: number) => {
      const topic: Topic = { topicID: topicId, topicName: stName };

      if (topic.topicName === 'John') {
        return of(topic);
      } else {
        return Observable.throw(topic);
      }

    });

    spyOn(searchTextService, 'getMessage').and.callFake(() => {
      if (typeReturn === 'topic') {
        return of({ type: 'topic', text: 'prim' });
      } else if (typeReturn === 'subtopic') {
        return of({ type: 'subtopic', text: 'sub' });
      } else {
        return of({ type: 'nothing', text: 'tert' });
      }
    }).bind(this);
    searchTextSendSpy = spyOn(searchTextService, 'sendMessage');

    alertSpy = spyOn(alertService, 'alert');

    dndSendSpy = spyOn(dndService, 'sendSubtopic');

    curricService = curriculumService;
    spyOn(curriculumService, 'getAllTopicPool').and.callFake(() => {
      if (getTopicErrorObserv) {
        return Observable.throw({status: 'This is a message that should be seen \
        when an error observable is returned by curriculumService.getAllTopicPool()'});
      } else {
        return of([]);
      }
    });

    fixture = TestBed.createComponent(TopicPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set the topics array to contain the same values as the subTopicName array', () => {
    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, { topicID: 2, topicName: 'ThirdTopic' }];

    component.subTopicName = Topics;
    component.initTopics();

    expect(component.topics).toEqual(['FirstTopic', 'SecondTopic', 'ThirdTopic']);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should return true if the specified Topic appears only once in the array', () => {
    const tempTopic: Topic = new Topic();

    tempTopic.topicName = 'ThirdTopic';
    tempTopic.topicID = 2;

    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, tempTopic, { topicID: 3, topicName: 'FourthTopic' }];

    const boolean = component.onlyUnique(tempTopic, 2, Topics);

    expect(boolean).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should return false if the specified index is not the first time the specified Topic appears in the array', () => {
    const tempTopic: Topic = new Topic();

    tempTopic.topicName = 'ThirdTopic';
    tempTopic.topicID = 2;

    const Topics: Array<Topic> = [{ topicID: 0, topicName: 'FirstTopic' },
    { topicID: 1, topicName: 'SecondTopic' }, tempTopic, { topicID: 3, topicName: 'FourthTopic' }, tempTopic];

    const boolean = component.onlyUnique(tempTopic, 4, Topics);

    expect(boolean).toBeFalsy();
  });

  /**
  * @author Holden Olivier
  * @batch 1803 usf
  */
  it('should return an array of unique Topics', () => {
    const Topics: Array<string> = ['FirstTopic',
      'SecondTopic',
      'ThirdTopic',
      'FourthTopic',
      'ThirdTopic',
      'SixthTopic'];

    const filteredTopics = Topics.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    component.topics = Topics;
    component.uniqueTopics();

    expect(component.uniqarrFiltered).toEqual(filteredTopics);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should fill subTopicArray with arrays representing the subtopics of all topics represented within subTopicName', () => {
    const Topics: Array<Topic> = [notParentTopic, { topicID: 0, topicName: 'FirstTopic' },
      { topicID: 1, topicName: 'SecondTopic' }, parentTopic, { topicID: 2, topicName: 'ThirdTopic' }];

    component.subTopicName = Topics;

    component.getSubTopics();

    const expected: SubtopicCurric[][] = [
      [],
      [],
      [],
      [
        {
          date: { day: 0, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'inProgress',
          subtopicId: 0, subtopicName: 'Subtopic 1'
        },
        {
          date: { day: 1, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'complete',
          subtopicId: 0, subtopicName: 'Subtopic 2'
        },
        {
          date: { day: 2, endTime: 1, startTime: 0, week: 6 }, parentTopic: parentTopic, status: 'upcoming',
          subtopicId: 0, subtopicName: 'Subtopic 3'
        }
      ],
      []
    ];

    expect(component.subTopicArray.length === 1);
    expect(component.subTopicArray).toEqual(expected);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set uniqarrFiltered to only contain values which include the provided text', () => {
    // Configure the spy on searchTextService.getMessage to return the data type of 'topic'
    typeReturn = 'topic';

    const inputArr: string[] = ['primary', 'salutation', 'prime', 'secondus', 'primate'];
    const expected: string[] = ['primary', 'prime', 'primate'];
    component.uniqarr = inputArr;

    component.initFilterTopicListener();

    expect(component.uniqarrFiltered).toEqual(expected);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set searchText to provided text', () => {
    // Configure the spy on searchTextService.getMessage to return the data type of 'subtopic'
    typeReturn = 'subtopic';
    component.initFilterTopicListener();
    expect(component.searchText).toEqual('sub');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should do absolutely nothing', () => {
    typeReturn = 'nothing';
    component.searchText = 'Testing';
    component.uniqarrFiltered = null;

    spyOn(component, 'getSubTopics');

    component.initFilterTopicListener();

    expect(component.searchText).toEqual('Testing');
    expect(component.uniqarrFiltered).toEqual(null);
    expect(component.getSubTopics).not.toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set searchText to empty string, and call searchTextService.sendMessage', () => {
    component.clearSubtopicSearch();
    expect(component.searchText).toEqual('');
    expect(searchTextSendSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should call searchTextService.sendMessge()', () => {
    component.clearTopic();
    expect(searchTextSendSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should call dndService.sendSubtopic()', () => {
    component.sendCurrentlyDragged(null);
    expect(dndSendSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should add subtopic to topicPoolCacheData, topic name to uniqarrFiltered, and alert user', () => {
    spyOn(component, 'getSubTopics');

    const topic: TopicName = { id: 1, name: 'Jean' };
    const subTopic: Topic = { topicID: 1, topicName: 'John' };

    component.uniqarrFiltered = new Array<string>();
    component.createTopic(topic.name, subTopic.topicName);


    expect(component.uniqarrFiltered).toContain(topic.name);
    expect(component.topicPoolCacheData).toContain(subTopic);
    expect(component.getSubTopics).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should alert user an error occured if addSubTopicName returns an error observable', () => {
    spyOn(component, 'getSubTopics');

    const topic: TopicName = { id: 1, name: 'Jean' };
    const subTopic: Topic = { topicID: 1, topicName: 'Jayn' };

    component.createTopic(topic.name, subTopic.topicName);

    expect(component.getSubTopics).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * This works except that I can't find a way to provide an event.
   */
  it ('should stop propogation of the triggering event, and set the selectedTopicId to the selected topic', () => {
    component.uniqarrFiltered = ['One'];
    component.subArray = [[{topicID: 1, topicName: 'One'}, {topicID: 2, topicName: 'Two'}],
    [{topicID: 3, topicName: 'Three'}, {topicID: 4, topicName: 'Four'}]];

    // This event is needed to ensure that it doesn't fail due to event being undefined.
    // And it seems impossible to access the element that would normally call this function.
    event = new Event('This is an event');

    component.getNewSubTopicReady(0);

    event = undefined;
    expect(component.selectedTopicId).toEqual(1);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should add subtopic to topicPoolCacheData, topic name to uniqarrFiltered, and alert user', () => {
    spyOn(component, 'getSubTopics');

    const subTopic: Topic = { topicID: 1, topicName: 'John' };

    component.selectedTopicId = 1;
    component.createSubTopic(subTopic.topicName);

    expect(component.topicPoolCacheData).toContain(subTopic);
    expect(component.getSubTopics).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
    expect(component.selectedTopicId).toEqual(0);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should alert user an error occured if addSubTopicName returns an error observable', () => {
    spyOn(component, 'getSubTopics');

    const subTopic: Topic = { topicID: 1, topicName: 'Jayn' };

    component.selectedTopicId = 1;
    component.createSubTopic(subTopic.topicName);

    expect(component.getSubTopics).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
    expect(component.selectedTopicId).toEqual(0);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should do nothing if newSubTopic.length is less than 2', () => {
    component.selectedTopicId = 500;
    component.createSubTopic('K');

    expect(component.selectedTopicId).toEqual(500);
    expect(subtopicAddSubtopicSpy).not.toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should call getTopics()', () => {
    spyOn(component, 'getTopics');
    component.ngOnInit();
    expect(component.getTopics).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should go through all the steps to get all topics', () => {
    // Set up for topicPoolCacheData to be what we need it to be.
    const tempArr: Array<Topic> = new Array<Topic>();
    curricService.currentTopicPoolData = of(tempArr);

    // We're testing a successful observable, not an error.
    getTopicErrorObserv = false;

    // Setting up the spies
    spyOn(console, 'log');
    spyOn(component, 'initTopics');
    spyOn(component, 'uniqueTopics');
    spyOn(component, 'getSubTopics');
    spyOn(component, 'initFilterTopicListener');
    spyOn(component, 'clearTopic');

    // Call the function
    component.getTopics();

    // Test for expected results
    expect(component.topicPoolCacheData).toEqual(tempArr);
    expect(console.log).not.toHaveBeenCalled();
    expect(component.initTopics).toHaveBeenCalled();
    expect(component.uniqueTopics).toHaveBeenCalled();
    expect(component.getSubTopics).toHaveBeenCalled();
    expect(component.initFilterTopicListener).toHaveBeenCalled();
    expect(component.clearTopic).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should enter the if statement and receive an error observable', () => {
    // Set up for topicPoolCacheData to be what we need it to be.
    const tempArr: Array<Topic> = new Array<Topic>();
    curricService.currentTopicPoolData = of(tempArr);

    // Set getAllTopicPool to return an eror observable
    getTopicErrorObserv = true;

    // Setting up the spies
    spyOn(console, 'log');

    // Call the function
    component.getTopics();

    // Test for expected results
    expect(component.topicPoolCacheData).toEqual(tempArr);
    expect(console.log).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should go into the else statement and set subTopicName to the provided array', () => {
    // Set up for topicPoolCacheData to be what we need it to be.
    const tempArr: Array<Topic> = new Array<Topic>();
    const arrayLength = 5;
    for (let index = 0; index < arrayLength; index++) {
      const element: Topic = new Topic();
      element.topicID = index;
      element.topicName = 'Topic: ' + index;

      tempArr.push(element);
    }
    curricService.currentTopicPoolData = of(tempArr);

    // We're testing a successful observable, not an error.
    getTopicErrorObserv = false;

    // Setting up the spies
    spyOn(component, 'initTopics');
    spyOn(component, 'uniqueTopics');
    spyOn(component, 'getSubTopics');
    spyOn(component, 'initFilterTopicListener');

    // Call the function
    component.getTopics();

    // Test for expected results
    expect(component.topicPoolCacheData).toEqual(tempArr);
    expect(component.subTopicName).toEqual(tempArr);
    expect(component.initTopics).toHaveBeenCalled();
    expect(component.uniqueTopics).toHaveBeenCalled();
    expect(component.getSubTopics).toHaveBeenCalled();
    expect(component.initFilterTopicListener).toHaveBeenCalled();
  });
});
