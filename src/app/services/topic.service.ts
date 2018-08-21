import { Injectable } from '@angular/core';
/*
 * HttpClient - What we use to make the http request.
 * HttpHeaders - What we need to pass in to the http request
 * in order to define the Content-Type.
 * Topic - The model that the current service pertains to.
 * Observable - The type of object returned by the http request,
 * in order to enable us to get the response asynchronously.
 * Environment - Contains the server endpoint that we're making
 * the HTTP Request to.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/topic';
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
export class TopicService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the topics from the server.
   */
  getAll(): Observable<Topic[]> {
    console.log('[LOG] - In TopicService.getAll()');
    return this.http.get<Topic[]>(environment.apiUrl + 'topics', HTTP_OPTIONS);
  }

  getByName(name: string): Observable<Topic> {
    console.log('[LOG] - In TopicService.getByName()');
    return this.http.get<Topic>(environment.apiUrl + 'topics?name=' + name, HTTP_OPTIONS);
  }

  add(name: string): Observable<Topic> {
    console.log('[LOG] - In TopicService.getAll()');
    const newTopic = new Topic();
    newTopic.name = name;
    return this.http.post<Topic>(environment.apiUrl + 'topics', JSON.stringify(newTopic), HTTP_OPTIONS);
  }
}
