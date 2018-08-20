import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { Subtopic } from '../models/subtopic';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  subtopic: BehaviorSubject<Subtopic> = new BehaviorSubject<Subtopic>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subtopic[]> {
    console.log('[LOG] - In SubtopicService.getAll()');
    return this.http.get<Subtopic[]>(environment.apiUrl + 'subtopics', HTTP_OPTIONS);
  }

  getSubtopicByParentId(id: number): Observable<Subtopic[]> {
    console.log('[LOG] - In SubtopicService.getSubtopicByParentId()');
    return this.http.get<Subtopic[]>(environment.apiUrl + `subtopics?parentTopic_id=${id}`);
  }
}
