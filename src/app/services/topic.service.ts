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
    return this.http.get<Topic[]>(environment.apiUrl + 'curriculums/topic', HTTP_OPTIONS);
  }

  /**
   * Function used to retrieve topics by name
   * @param name The name of the topic to be retrieved
   */
  getByName(name: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(environment.apiUrl + `curriculums/topic?name=${name}&name=${this.deactivateName(name)}`, HTTP_OPTIONS);
  }

  /**
   * Function used to create topic.
   * Only pass the name as the id should be incremented and placed onto the topic on the backend
   * @param name Name of the topic
   */
  add(name: string): Observable<Topic> {
    const newTopic = new Topic();
    newTopic.name = name;
    return this.http.post<Topic>(environment.apiUrl + 'curriculums/topic', JSON.stringify(newTopic), HTTP_OPTIONS);
  }

  /**
   * Get a topic by its unique id
   * @param id Id of the topic
   */
  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(environment.apiUrl + `curriculums/topic/${id}`, HTTP_OPTIONS);
  }
  /**
   * The function used to deactivate a topic in the server
   */
  deactivate(topic: Topic): Observable<Object> {
    topic.name = this.deactivateName(topic.name);
    return this.http.put(environment.apiUrl + `curriculums/topic/${topic.id}`,
      topic, HTTP_OPTIONS);
  }

  /**
   * The function used to reactive a topic in theserver
   */
  reactivate(topic: Topic): Observable<Object> {
    topic.name = this.reactivateName(topic.name);
    return this.http.put(environment.apiUrl + `curriculums/topic/${topic.id}`,
      topic, HTTP_OPTIONS);
  }

  /**
   * Helper function to append '(DEACTIVATED) ' to the
   * beginning of the topic name, to show that
   * the topic is deactivated.
   * @param topicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  deactivateName(topicName: string): string {
    return '(DEACTIVATED) ' + topicName;
  }

  /**
   * Helper function to remove '(DEACTIVATED) ' from the
   * beginning of the topic name
   * @param topicName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  reactivateName(topicName: string): string {
    if (topicName.indexOf('(DEACTIVATED) ') >= 0) {
      topicName = topicName.substring(
        topicName.lastIndexOf('(DEACTIVATED) ')
        + ('(DEACTIVATED) ').length
      );
    }
    return topicName;
  }
}
