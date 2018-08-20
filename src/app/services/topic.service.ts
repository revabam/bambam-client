import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/topic';
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
export class TopicService {

  topic: BehaviorSubject<Topic> = new BehaviorSubject<Topic>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Topic[]> {
    console.log('[LOG] - In TopicService.getAll()');
    return this.http.get<Topic[]>(environment.apiUrl + 'topics', HTTP_OPTIONS);
  }

  getTopicById(id: number): Observable<Topic> {
    console.log('[LOG] - In TopicService.getTopicById()');
    return this.http.get<Topic>(environment.apiUrl + `topics/${id}`, HTTP_OPTIONS);
  }
}
