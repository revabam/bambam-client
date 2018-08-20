import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subtopic } from '../models/subtopic';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  topic: BehaviorSubject<Subtopic> = new BehaviorSubject<Subtopic>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Subtopic[]> {
    console.log('[LOG] - In SubtopicService.getAll()');
    return this.http.get<Subtopic[]>(environment.apiUrl + 'subtopics', HTTP_OPTIONS);
  }
}
