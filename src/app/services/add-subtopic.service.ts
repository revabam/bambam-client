import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Batch } from '../models/batch.model';
import { ScheduledSubtopic } from '../models/scheduledsubtopic.model';
import { Schedule } from '../models/schedule.model';
import { Subtopic } from '../models/subtopic.model';

import { UrlService } from './url.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddSubtopicService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  /**
   * Retrieves current batch information
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  getBatchById(id: number): Observable<Batch> {
    return this.http
        .get<Batch>(this.urlService.addsubtopics.getBatchIdUrl(id)).pipe(
          map(data => {
            return data;
          }
        ));
  }

  /**
   * Retrieves all the subtopics of the current batch
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  // getBatchSubtopics(id: number): Observable<Subtopic[]> {
  //   return this.http
  //       .get<Subtopic[]>(this.urlService.addsubtopics.getBatchSubtopicsUrl(id, 34, 0))
  //       .map( data => {
  //         return data;
  //       });
  // }

  /**
   * Updates old date on the database with the new date selected
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param batchId current batch id
   * @param subtopicId subtopic id
   * @param date date of the subtopic
   */
  updateDate(subtopicId, batchId, date): Observable<any> {
    return this.http.post<any>(this.urlService.addsubtopics.updateDateUrl(subtopicId, batchId, date), '' , httpOptions);
  }

  /**
   * Obtains all the subtopics from the database
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  getSubtopicPool(curriculumId: number): Observable<number[]> {
    return this.http
        .get<number[]>(this.urlService.addsubtopics.getSubtopicPoolUrl(curriculumId)).pipe(
          map(data => {
            return data;
          }
        ));
  }

  /**
   * Sends a subtopic object to be persisted to the database
   * @param subtopic subtopic object
   */
  addSubtopic(subtopic): Observable<Subtopic> {
    return this.http.post<Subtopic>(this.urlService.addsubtopics.addSubtopicUrl(), JSON.stringify(subtopic), httpOptionsJson);
  }

  /**
   * Updates a Schedule object on the backend
   * @param schedule - new version of a schedule to be updated
   * @author Scott Bennett - (Batch 1802-Matt)
   * @author Trevor Fortner - (Batch 1802-Matt)
   */
  updateSchedule(schedule: Schedule) {
    return this.http.patch<Schedule>(this.urlService.addsubtopics.updateScheduleURL, schedule);
  }

  /**
   * Adds a new ScheduledSubtopic object to the schedule with the given id
   * @param scheduleId - id for the schedule to add the ScheduledSubtopic to
   * @param scheduledSubtopic - new ScheduledSubtopic to add
   * @author Scott Bennett - (Batch 1802-Matt)
   * @author Trevor Fortner - (Batch 1802-Matt)
   */
  addNewScheduledSubtopic(scheduleId: number, scheduledSubtopic: ScheduledSubtopic) {
    return this.http.post<ScheduledSubtopic>(this.urlService.addsubtopics.addNewScheduledSubtopic(scheduleId), scheduledSubtopic);
  }
}
