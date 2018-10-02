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
import { SubTopic } from '../models/subtopic';
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
   * Delete SubTopics related to a parents topic ID
   * @param id The id of the topic
   */
  deleteSubTopicByParentId(id: number): Observable<SubTopic[]> {
    return this.http.delete<SubTopic[]>(environment.zuulUrl + `SubTopics?parentTopic_id=${id}`, HTTP_OPTIONS);
  }

   /**
   * Delete SubTopics related to a parents topic ID
   * @param id The id of the topic
   */
  deleteSubTopic(subTopic: SubTopic): Observable<SubTopic[]> {
    console.log('deleting subtopic' + subTopic);
    console.log('deleting subtopic' + subTopic.id);
    return this.http.delete<SubTopic[]>(environment.zuulUrl + `curriculums/subtopic/${subTopic}`,
    HTTP_OPTIONS);
}

}
