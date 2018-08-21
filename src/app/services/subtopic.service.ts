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

  /**
   * The function used to deactivate a subtopic in the server
   */
  deactivate(subtopic: Subtopic): Observable<Object> {
    console.log('[LOG] - In SubtopicService.deactivate()');
    subtopic.name = this.deactivateName(subtopic.name);
    return this.http.put(environment.apiUrl + `subtopics/${subtopic.id}`,
      subtopic, HTTP_OPTIONS);
  }

  /**
   * The function used to reactivate a subtopic in theserver
   */
  reactivate(subtopic: Subtopic): Observable<Object> {
    console.log('[LOG] - In SubtopicService.reactivate()');
    subtopic.name = this.reactivateName(subtopic.name);
    return this.http.put(environment.apiUrl + `subtopics/${subtopic.id}`,
      subtopic, HTTP_OPTIONS);
  }

  /**
   * Helper function to append '(DEACTIVATED) ' to the
   * beginning of the subtopic name, to show that
   * the subtopic is deactivated.
   * @param subtopicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  deactivateName(subtopicName: string): string {
    return '(DEACTIVATED) ' + subtopicName;
  }

  /**
   * Helper function to remove '(DEACTIVATED) ' from the
   * beginning of the subtopic name
   * @param subtopicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  reactivateName(subtopicName: string): string {
    if (subtopicName.indexOf('(DEACTIVATED) ') >= 0) {
      subtopicName = subtopicName.substring(
        subtopicName.lastIndexOf('(DEACTIVATED) ')
        + ('(DEACTIVATED) ').length
      );
    }
    return subtopicName;
  }
  getSubtopicByParentId(id: number): Observable<Subtopic[]> {
    console.log('[LOG} - In SubtopicService.getSubtopicByParentId()');
    return this.http.get<Subtopic[]>(environment.apiUrl + `subtopics?parentTopic_id=${id}`, HTTP_OPTIONS);
  }
}
