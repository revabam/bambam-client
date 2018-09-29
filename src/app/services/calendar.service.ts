import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculum } from '../models/curriculum';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../models/calendar-event';
import { SubTopic } from '../models/subtopic';
import { CalendarCurriculum } from '../models/calendar-curriculum';
import { CalendarSubtopic } from '../models/calendar-subtopic';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  /**
   * Get all stored curriculums
   * @returns Observable of curriculum[]
   */
  getCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(environment.apiUrl + 'curriculums', HTTP_OPTIONS);
  }

  /**
   * Retrieve curriculum based on unique id
   * @param id Curriculum id
   * @returns  Curriculum
   */
  getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(environment.apiUrl + `curriculums/${id}`, HTTP_OPTIONS);
  }

  /**
   * Create a calendar event
   * @param event CalendarEvent
   * @returns CalendarEvent
   */
  addEvent(event: CalendarEvent) {
    const json = JSON.stringify(event);
    return this.http.post(environment.apiUrl, json, HTTP_OPTIONS);
  }

  /**
   * Create a calendar curriculum to be stored separated from the original curriculum
   * after being add to a calendar
   * @param curriculum
   */
  addCalendarCirriculum(curriculum: CalendarCurriculum): Observable<CalendarCurriculum> {
    const json = JSON.stringify(curriculum);
    return this.http.post<CalendarCurriculum>(environment.apiUrl + 'calendar-curriculums', json, HTTP_OPTIONS);
  }

  /**
   * Create a calendar subtopic associated with a curriculum
   * @param subtopic
   */
  addCalendarSubtopic(subtopic: CalendarSubtopic): Observable<CalendarSubtopic> {
    const json = JSON.stringify(subtopic);
    return this.http.post<CalendarSubtopic>(environment.apiUrl + 'calendar-subtopics', json, HTTP_OPTIONS);
  }

  /**
   * Store an entire array of calendar events. Used for json-server to eliminate errors and
   * creation failures. When finally connected to backend, events should be added individually using
   * addCalendarEvent.
   * @param events An array of calendar events
   */
  addCalendarEvents(events: CalendarEvent[]): Observable<CalendarEvent[]> {
    const json = JSON.stringify(events);
    return this.http.post<CalendarEvent[]>(environment.zuulUrl + 'calendars/calendars/event', json, HTTP_OPTIONS);
  }

  /**
   * Add a individual calendar event.
   * @param event
   */
  addCalendarEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const json = JSON.stringify(event);
    return this.http.post<CalendarEvent>(environment.apiUrl + 'calendar-events', json, HTTP_OPTIONS);
  }

  /**
   * Returns all stored calendar events.
   * This should be used when client side is connected to server side.
   */
  getCalendarEvents(id: number): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(environment.zuulUrl + `calendars/calendars/event/trainer/${id}`, HTTP_OPTIONS);
  }

  /**
   * Returns a calendar event by id
   */
  getCalendarEventsById(id: number): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(environment.zuulUrl + `calendars/calendars/event/${id}`, HTTP_OPTIONS);
  }

  /**
   * Retrieve all stored calendar subtopics
   */
  getCalendarSubtopics(): Observable<SubTopic[]> {
    return this.http.get<SubTopic[]>(environment.apiUrl + 'calendar-subtopics', HTTP_OPTIONS);
  }

  /**
   * Retrieve all stored calendar curriculums
   */
  getCalendarCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(environment.apiUrl + 'calendar-curriculums', HTTP_OPTIONS);
  }
}
/**
 * @author Aaron Mathews | Kyle Smith | Brandon Scoggins | 1806-Jun18-USF-Java | Wezley Singleton
 */
