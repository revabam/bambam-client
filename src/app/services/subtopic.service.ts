import { Curriculum } from './../models/curriculum';
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

/**
 * Since the environment variable are all over the place switching between the server side endpoints
 * and the client side json server is slightly more tricky than it should be. To hit the json server
 * make sure you are pointing to an environment variable that has the localhost port 3000 string and
 * change the '/'s to '-'s for each endpoint
 *
 * @author Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
 */
@Injectable({
  providedIn: 'root'
})
export class SubTopicService {
  subtopics: SubTopic[];
  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the SubTopics from the server.
   */
  getAll(): Observable<SubTopic[]> {
    return this.http.get<SubTopic[]>(environment.apiUrl + 'curriculums/subtopic', HTTP_OPTIONS);
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
    return this.http.post<SubTopic>(environment.apiUrl + 'curriculums/subtopic', JSON.stringify(newSubTopic), HTTP_OPTIONS);
  }

  /**
   * Get SubTopics related to a particular topic
   * @param id The id of the topic
   */
  getSubTopicByParentId(id: number): Observable<SubTopic[]> {
    return this.http.get<SubTopic[]>(environment.apiUrl + `curriculums/subtopic?parentTopic_id=${id}`, HTTP_OPTIONS);
  }

  /**
   * Sets the names and parentTopicId of the daySubTopics of a curriculum since it is not being persisted to the db
   * @param curriculum the curriculum to update topic names
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  setDayTopicNames(curriculum: Curriculum): Curriculum {
    curriculum.curriculumWeeks.forEach((week) => {
      week.curriculumDays.forEach((day) => {
        day.daySubTopics.forEach((daySubTopic) => {
          if (this.subtopics) {
            const subTopic = this.subtopics.find((subtopic) => subtopic.id === daySubTopic.subTopicId);
            daySubTopic.name = subTopic.name;
            daySubTopic.parentTopicId = subTopic.parentTopicId;
          }
        });
      });
    });
    return curriculum;
  }

  deleteSubTopic(subTopic: SubTopic): Observable<SubTopic[]> {
    return this.http.delete<SubTopic[]>(environment.zuulUrl + `curriculums/subtopic/${subTopic.id}`,
      HTTP_OPTIONS);
  }
}
