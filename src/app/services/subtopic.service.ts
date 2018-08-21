import { Injectable } from '@angular/core';
/*
 * HttpClient - What we use to make the http request.
 * HttpHeaders - What we need to pass in to the http request
 * in order to define the Content-Type.
 * Subtopic - The model that the current service pertains to.
 * Observable - The type of object returned by the http request,
 * in order to enable us to get the response asynchronously.
 * Environment - Contains the server endpoint that we're making
 * the HTTP Request to.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subtopic } from '../models/subtopic';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

// The content type for our HTTP requests is JSON.
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the subtopics from the server.
   */
  getAll(): Observable<Subtopic[]> {
    console.log('[LOG] - In SubtopicService.getAll()');
    return this.http.get<Subtopic[]>(environment.apiUrl + 'subtopics', HTTP_OPTIONS);
  }

  add(name: string, parentId: number): Observable<Subtopic> {
    console.log('[LOG] - In TopicService.getAll()');
    const newSubtopic = new Subtopic();
    newSubtopic.name = name;
    newSubtopic.parentTopic_id = parentId;
    return this.http.post<Subtopic>(environment.apiUrl + 'subtopics', JSON.stringify(newSubtopic), HTTP_OPTIONS);
  }
}
