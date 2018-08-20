import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Curriculum } from '../models/curriculum';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../models/calendar-event';
import { ObserversModule } from '../../../node_modules/@angular/cdk/observers';

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

  getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(environment.apiUrl + `curriculums/${id}`, HTTP_OPTIONS);
  }

  addEvent(event: CalendarEvent) {
    const json = JSON.stringify(event);
    return this.http.post(environment.apiUrl, json, HTTP_OPTIONS);
  }
}
