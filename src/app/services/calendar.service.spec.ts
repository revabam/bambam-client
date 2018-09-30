import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([CalendarService], (service: CalendarService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getCurriculumById', function() {
    const calendar = new CalendarService(null);
    spyOn(calendar, 'getCurriculumById');
    calendar.getCurriculumById(0);
    expect(calendar.getCurriculumById).toHaveBeenCalled();
  });
  it('should call getCurriculum', function() {
    const curriculum = new CalendarService(null);
    spyOn(curriculum, 'getCurriculum');
    curriculum.getCurriculum();
    expect(curriculum.getCurriculum).toHaveBeenCalled();
  });
  it('should call addEvent', function() {
    const event = new CalendarService(null);
    spyOn(event, 'addEvent');
    event.addEvent(null);
    expect(event.addEvent).toHaveBeenCalled();
  });
  it('should call addCalendarCirriculum', function() {
    const addCurriculum = new CalendarService(null);
    spyOn(addCurriculum, 'addCalendarCirriculum');
    addCurriculum.addCalendarCirriculum(null);
    expect(addCurriculum.addCalendarCirriculum).toHaveBeenCalled();
  });
  it('should call addCalendarSubtopic', function() {
    const addSubtopic = new CalendarService(null);
    spyOn(addSubtopic, 'addCalendarSubtopic');
    addSubtopic.addCalendarSubtopic(null);
    expect(addSubtopic.addCalendarSubtopic).toHaveBeenCalled();
  });
  // it('should call addCalendarEventList', function() {
  //   const eventList = new CalendarService(null);
  //   spyOn(eventList, 'addCalendarEventList');
  //   eventList.addCalendarEventList(null);
  //   expect(eventList.addCalendarEventList).toHaveBeenCalled();
  // });
  it('should call addCalendarEvent', function() {
    const event = new CalendarService(null);
    spyOn(event, 'addCalendarEvent');
    event.addCalendarEvent(null);
    expect(event.addCalendarEvent).toHaveBeenCalled();
  });
  // it('should call getCalendarEvents', function() {
  //   const eventGet = new CalendarService(null);
  //   spyOn(eventGet, 'getCalendarEvents');
  //   eventGet.getCalendarEvents();
  //   expect(eventGet.getCalendarEvents).toHaveBeenCalled();
  // });
  it('should call getCalendarSubtopics', function() {
    const subtopic = new CalendarService(null);
    spyOn(subtopic, 'getCalendarSubtopics');
    subtopic.getCalendarSubtopics();
    expect(subtopic.getCalendarSubtopics).toHaveBeenCalled();
  });
  it('should call getCalendarCurriculums', function() {
    const curriculums = new CalendarService(null);
    spyOn(curriculums, 'getCalendarCurriculums');
    curriculums.getCalendarCurriculums();
    expect(curriculums.getCalendarCurriculums).toHaveBeenCalled();
  });
});
