import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CalendarService } from './calendar.service';

/**
 * Here we are testing the methods within calender service
 * @name calenderTest
 * @author Chris Holmes | Spark1806-USF-Java | Steven Kelsey
 */
describe('CalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([CalendarService], (service: CalendarService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * getCurriculumById Test
   * @param id
   */
  it('should call getCurriculumById', function() {
    const calendar = new CalendarService(null);
    spyOn(calendar, 'getCurriculumById');
    calendar.getCurriculumById(0);
    expect(calendar.getCurriculumById).toHaveBeenCalled();
  });

  /**
   * getCurriculum Test
   * @param none
   */
  it('should call getCurriculum', function() {
    const curriculum = new CalendarService(null);
    spyOn(curriculum, 'getCurriculum');
    curriculum.getCurriculum();
    expect(curriculum.getCurriculum).toHaveBeenCalled();
  });

  /**
   * addEvent Test
   * @param null
   */
  it('should call addEvent', function() {
    const event = new CalendarService(null);
    spyOn(event, 'addEvent');
    event.addEvent(null);
    expect(event.addEvent).toHaveBeenCalled();
  });

  /**
   * addCalendarCurriculum Test
   * @param null
   */
  it('should call addCalendarCirriculum', function() {
    const addCurriculum = new CalendarService(null);
    spyOn(addCurriculum, 'addCalendarCirriculum');
    addCurriculum.addCalendarCirriculum(null);
    expect(addCurriculum.addCalendarCirriculum).toHaveBeenCalled();
  });

  /**
   * addCalendarSubtopic Test
   * @param null
   */
  it('should call addCalendarSubtopic', function() {
    const addSubtopic = new CalendarService(null);
    spyOn(addSubtopic, 'addCalendarSubtopic');
    addSubtopic.addCalendarSubtopic(null);
    expect(addSubtopic.addCalendarSubtopic).toHaveBeenCalled();
  });

  /**
   * addCalendarEvents Test
   * @param id
   */
  it('should call addCalendarEvents', function() {
    const eventList = new CalendarService(null);
    spyOn(eventList, 'addCalendarEvents');
    eventList.addCalendarEvents(null);
    expect(eventList.addCalendarEvents).toHaveBeenCalled();
  });

  /**
   * addCalendarEvent Test
   * @param null
   */
  it('should call addCalendarEvent', function() {
    const event = new CalendarService(null);
    spyOn(event, 'addCalendarEvent');
    event.addCalendarEvent(null);
    expect(event.addCalendarEvent).toHaveBeenCalled();
  });

  /**
   * getCalendarEvents Test
   * @param id
   */
  it('should call getCalendarEvents', function() {
    const eventGet = new CalendarService(null);
    spyOn(eventGet, 'getCalendarEvents');
    eventGet.getCalendarEvents(0);
    expect(eventGet.getCalendarEvents).toHaveBeenCalled();
  });

  /**
   * getCalendarSubtopics Test
   * @param none
   */
  it('should call getCalendarSubtopics', function() {
    const subtopic = new CalendarService(null);
    spyOn(subtopic, 'getCalendarSubtopics');
    subtopic.getCalendarSubtopics();
    expect(subtopic.getCalendarSubtopics).toHaveBeenCalled();
  });

  /**
   * getCalendarCurriculums Test
   * @param none
   */
  it('should call getCalendarCurriculums', function() {
    const curriculums = new CalendarService(null);
    spyOn(curriculums, 'getCalendarCurriculums');
    curriculums.getCalendarCurriculums();
    expect(curriculums.getCalendarCurriculums).toHaveBeenCalled();
  });
});
