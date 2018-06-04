import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CalendarEvent } from '../models/calendar-event.model';
import { Curriculum } from '../models/curriculum.model';
import { Subtopic } from '../models/subtopic.model';
import { Schedule } from '../models/schedule.model';
import { ScheduledSubtopic } from '../models/scheduledsubtopic.model';
import { TopicName } from '../models/topicname.model';
import { TopicWeek } from '../models/topicweek.model';

import { CalendarStatusService } from './calendar-status.service';
import { UrlService } from './url.service';

import { CALENDAR_VALUE_ACCESSOR } from 'primeng/primeng';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()
export class CalendarService {
  @Output()
  addCalendarEvent = new EventEmitter<CalendarEvent>();

  constructor(private http: HttpClient, private statusService: CalendarStatusService, private urlService: UrlService) { }

  /**
   * Gets subtopics by batch and uses pagination to limit the results
   * apposed to getting them all at one time
   * @author James Holzer Jordan DeLong| Batch: 1712-dec10-java-steve
   * @returns SubTopic[]
   * @param batchId number
   * @param pageNumber: number
   * @param pageSize: number
   */
  // getSubtopicsByBatchPagination(batchId: number, pageNumber: number, pageSize: number): Observable<Subtopic[]> {
  //   return this.http.get<Subtopic[]>(this.urlService.calendar.getSubtopicsByBatchPaginationUrl(batchId, pageNumber, pageSize)).map(
  //     data => {
  //       return data;
  //     }
  //   );
  // }


  /**
   * Retrieves subtopic by batchId
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns SubTopic[]
   * @param batchId number
   */
  getSubtopicsByBatch(batchId: number): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(this.urlService.calendar.getSubtopicsByBatchUrl(batchId)).pipe(
      map(data => {
        return data;
      }
    ));
  }

    /**
   * Retrieves schedule by scheduleId
   * @author Scott Bennett | Batch: 1802-feb12-Matt
   * @returns Schedule
   * @param batchId number
   */
  getScheduleByScheduleId(scheduleId: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.urlService.calendar.getScheduleById(scheduleId)).pipe(
      map(data => {
        return data;
      }
    ));
  }


  /**
   * Retrieves the number of subtopics by batchId
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns number
   * @param batchId number
   */
  getNumberOfSubTopicsByBatch(batchId: number): Observable<number> {
    return this.http.get<number>(this.urlService.calendar.getNumberOfSubTopicsByBatchUrl(batchId)).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /**
   * Retrieves the topics by batchId into a TopicWeek for a given week
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns TopicWeek
   * @param batchId number
   */
  getTopicsByBatchPag(batchId: number): Observable<TopicWeek> {
    return this.http.get<TopicWeek>(this.urlService.calendar.getTopicsByBatchPagUrl(batchId)).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /**
   * Changes the subtopic date
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param subtopicId number
   * @param batchId: number
   * @param status: number
   */
  changeTopicDate(schedule: Schedule) {
    return this.http.patch<Schedule>(this.urlService.calendar.changeTopicDateUrl, schedule);
  }

  /**
   * Updates the topic's status
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param subtopicId number
   * @param batchId: number
   * @param status: number
   */
  updateTopicStatus(calendarEvent: CalendarEvent, batchId: number): Observable<any> {
    return this.http.get(this.urlService.calendar.updateTopicStatusUrl(calendarEvent.subtopicId, batchId, calendarEvent.status)).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /**
   * Add a topic to a days
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param topics: TopicName[]
   */
  addTopics(topics: TopicName[]) {
    return this.http.post(this.urlService.calendar.addTopicsUrl(), topics, httpOptions).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /**
   * Adds subtopic sent from the add-subtopic component and emits it to the calendar component
   * @param subtopic
   * @author Sean Sung | Batch: 1712-dec10-java-steve
   */
  addSubtopicToCalendar(subtopic: Subtopic) {
    const newCalendarSubtopic = this.mapSubtopicToEvent(subtopic);
    this.addCalendarEvent.emit(newCalendarSubtopic);
  }

  /**
   * maps Subtopic object to CalendarEvent object
   * @param subtopic
   * @author Sean Sung | Batch: 1712-dec10-java-steve
   */
  mapSubtopicToEvent(subtopic: Subtopic): CalendarEvent {
    const calendarEvent = new CalendarEvent();
    calendarEvent.color = this.statusService.getStatusColor(subtopic.status);
    calendarEvent.start = subtopic.startTime;
    calendarEvent.status = subtopic.status;
    calendarEvent.subtopicId = subtopic.subtopicId;
    calendarEvent.title = subtopic.subtopicName;

    return calendarEvent;
  }
}
