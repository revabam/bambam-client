import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Curriculum } from '../models/curriculum';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../models/calendar-event';
import { Subtopic } from '../models/subtopic';
import { MyEvent } from '../routes/pages/calendar/calendar.component';
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

  getCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(environment.apiUrl + 'curriculums', HTTP_OPTIONS);
  }

  // saveCalanderCurriculum() {

  // }

  getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(environment.apiUrl + `curriculums/${id}`, HTTP_OPTIONS);
  }

  addEvent(event: CalendarEvent) {
    const json = JSON.stringify(event);
    return this.http.post(environment.apiUrl, json, HTTP_OPTIONS);
  }

  addCalendarCirriculum(curriculum: CalendarCurriculum): Observable<CalendarCurriculum> {
    const json = JSON.stringify(curriculum);
    return this.http.post<CalendarCurriculum>(environment.apiUrl + 'calendar-curriculums', json, HTTP_OPTIONS);
  }

  addCalendarSubtopic(subtopic: CalendarSubtopic): Observable<CalendarSubtopic> {
    const json = JSON.stringify(subtopic);
    return this.http.post<CalendarSubtopic>(environment.apiUrl + 'calendar-subtopics', json, HTTP_OPTIONS);
  }

  addCalendarEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const json = JSON.stringify(event);
    return this.http.post<CalendarEvent>(environment.apiUrl + 'calendar-events', json, HTTP_OPTIONS);
  }

  getCalendarEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEvent[]>(environment.apiUrl + 'calendar-events', HTTP_OPTIONS);
  }

  getCalendarSubtopics(): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(environment.apiUrl + 'calendar-subtopics', HTTP_OPTIONS);
  }

  getCalendarCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(environment.apiUrl + 'calendar-curriculums', HTTP_OPTIONS);
  }
}
