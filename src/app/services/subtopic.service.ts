import { Injectable } from '@angular/core';
/*
 * HttpClient - What we use to make the http request.
 * HttpHeaders - What we need to pass in to the http request
 * in order to define the Content-Type.
 * SubTopic - The model that the current service pertains to.
 * Observable - The type of object returned by the http request,
 * in order to enable us to get the response asynchronously.
 * Environment - Contains the server endpoint that we're making
 * the HTTP Request to.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubTopic } from '../models/SubTopic';
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
export class SubTopicService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the SubTopics from the server.
   */
  getAll(): Observable<SubTopic[]> {
    return this.http.get<SubTopic[]>(environment.apiUrl + 'SubTopics', HTTP_OPTIONS);
  }

  /**
   * Add a new SubTopic
   * @param name      name of the SubTopic
   * @param parentId  reference id to the topic it belongs to
   */
  add(name: string, parentId: number): Observable<SubTopic> {
    const newSubTopic = new SubTopic();
    newSubTopic.name = name;
    newSubTopic.parentTopicId = parentId;
    return this.http.post<SubTopic>(environment.apiUrl + 'SubTopics', JSON.stringify(newSubTopic), HTTP_OPTIONS);
  }

  /**
   * Get SubTopics related to a particular topic
   * @param id The id of the topic
   */
  getSubTopicByParentId(id: number): Observable<SubTopic[]> {
    return this.http.get<SubTopic[]>(environment.apiUrl + `SubTopics?parentTopic_id=${id}`, HTTP_OPTIONS);
  }

  /**
   * The function used to deactivate a SubTopic in the server
   */
  deactivate(subTopic: SubTopic): Observable<Object> {
    subTopic.name = this.deactivateName(subTopic.name);
    return this.http.put(environment.apiUrl + `SubTopics/${subTopic.id}`,
      subTopic, HTTP_OPTIONS);
  }

  /**
   * The function used to reactivate a SubTopic in the server
   */
  reactivate(subTopic: SubTopic): Observable<Object> {
    subTopic.name = this.reactivateName(subTopic.name);
    return this.http.put(environment.apiUrl + `SubTopics/${subTopic.id}`,
      subTopic, HTTP_OPTIONS);
  }

  /**
   * Helper function to append '(DEACTIVATED) ' to the
   * beginning of the SubTopic name, to show that
   * the SubTopic is deactivated.
   * @param SubTopicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  deactivateName(SubTopicName: string): string {
    return '(DEACTIVATED) ' + SubTopicName;
  }

  /**
   * Helper function to remove '(DEACTIVATED) ' from the
   * beginning of the SubTopic name
   * @param SubTopicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  reactivateName(SubTopicName: string): string {
    if (SubTopicName.indexOf('(DEACTIVATED) ') >= 0) {
      SubTopicName = SubTopicName.substring(
        SubTopicName.lastIndexOf('(DEACTIVATED) ')
        + ('(DEACTIVATED) ').length
      );
    }
    return SubTopicName;
  }
}
