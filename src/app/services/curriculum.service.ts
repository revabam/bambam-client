import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UrlService } from './url.service';

import { Curriculum } from '../models/curriculum.model';
import { CurriculumSubtopic } from '../models/curriculumSubtopic.model';
import { CurriculumSubtopicDTO } from '../models/curriculumSubtopicDTO.model';
import { Schedule } from '../models/schedule.model';
import { ScheduleZ } from '../models/scheduleZ.model';
import { SubtopicName } from '../models/subtopicname.model';
import { Subtopic } from '../models/subtopic.model';
import { Topic } from '../models/topic.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()
export class CurriculumService {

  private dataSource = new BehaviorSubject<CurriculumSubtopic[]>([]);
  currentData = this.dataSource.asObservable();

  public allCurriculumData = new BehaviorSubject<Curriculum[]>([]);
  currentAllCurriculumData = this.allCurriculumData.asObservable();

  private allTopicPoolData = new BehaviorSubject<Topic[]>([]);
  currentTopicPoolData = this.allTopicPoolData.asObservable();

  private selectedCurrData = new BehaviorSubject<Curriculum>(null);
  currentSelectedCurr = this.selectedCurrData.asObservable();

  constructor(private http: HttpClient, private modalService: NgbModal, private urlService: UrlService) { }

  changeData(data: CurriculumSubtopic[]) {
    this.dataSource.next(data);
  }

  refreshCurriculums(data: Curriculum[]) {
    this.allCurriculumData.next(data);
  }

  changeCurriculum(data: Curriculum) {
    this.selectedCurrData.next(data);
  }

  /**  This gets all curriculums from the API
   *   @author: Mohamad Alhindi
    *  @batch: 1712-Dec11-2017
    *  @return: Observable<Curriculum[]>
    */
  getAllCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.urlService.curriculum.getCurriculumAllUrl()).pipe(
      map( data => {
        return data;
      }
    ));
  }

  /** This will get a specific curriculum by the curriculum id
   *  @author: Mohamad Alhindi
    * @batch: 1712-Dec11-2017
    * @return: Observable<Curriculum>
    * @param: Curriculum Id
    */
  getCurriculumById(cid: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.urlService.curriculum.getCurriculumByIdUrl(cid)).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /** This will get a curriculums schedule based on the curriculum id
   *  @author: Mohamad Alhindi
    * @batch: 1712-Dec11-2017
    * @return: Observable<CurriculumSubtopic[]>
    * @param: Curriculum Id
    */
  getSchedualeByCurriculumId(cid: number): Observable<ScheduleZ> {
    return this.http.get<ScheduleZ>(this.urlService.curriculum.getSchedulesByCurriculumIdUrl(cid)).pipe(
      map(data => {
        return data;
      }
    ));
  }
  /** Gets the entire topic pool being taught at revature
   *  @author: Mohamad Alhindi
    * @batch:  1712-Dec11-2017
    * @return: Observable<SubtopicName[]>
    */
  getAllTopicPool(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.urlService.curriculum.getTopicPoolAllUrl()).pipe(
      map(data => {
        this.allTopicPoolData.next(data);
        return data;
      }
    ));
  }

  /** Gets entire subtopic pool as well as a relationship to which topic they belong to
    * @author: Mohamad Alhindi
    * @batch:  1712-Dec11-2017
    * @return: Observable<Subtopic[]>
    */
  getSubtopicPool(): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(this.urlService.curriculum.getSubtopicPoolAllUrl()).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /** Allows you to add a curriculum to the backend
    * @author: Carter Taylor
    * @batch: 1712-Dec11-2017
    * @param: CurriculumSubtopicDTO
    */
   addCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.urlService.curriculum.addCurriculumUrl(), curriculum).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /** This method allows to set a version of a specific curriculum to master
   *  @author: Carter Taylor
    * @batch: 1712-Dec11-2017
    * @param: Curriculum Id
    */
  markCurriculumAsMaster(curriculum: Curriculum) {
    return this.http.patch(this.urlService.curriculum.makeCurriculumMasterByIdUrl(curriculum.id), httpOptions).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /** Sync batch by batchId getting list of curriculum subtopics related to that batch type
   *  @author: Carter Taylor
    * @batch:  1712-Dec11-2017
    * @param:  Batch Id
    */
  syncBatch(batchId: number) {
    return this.http.get(this.urlService.curriculum.syncBatchByIdUrl(batchId)).pipe(
      map(data => {
        return data;
      }
    ));
  }

  /** Delete a curriculum and it's CurriculumSubtopics
    * @author: Carter Taylor, James Holzer
    * @batch: 1712-Dec11-2017
    * @param: Curriculum
    */
    deleteCurriculumVersion(version: Curriculum) {
      return this.http.post(this.urlService.curriculum.deleteCurriculumVersionUrl(), version, {
        responseType: 'text',
      });
    }

    /** Get schedule object by ID
     * @author: Trevor Fortner (1802-Matt)
     * @param: number - id - int to get the schedule of
     */
    getScheduleById(id: number): Observable<Schedule> {
      return this.http.get<Schedule>(this.urlService.curriculum.getScheduleById(id)).pipe(
        map(data => {
          return data;
        }
      ));
    }

    addSchedule(json: any) {
      return this.http.post(this.urlService.curriculum.addSchedule(), JSON.stringify(json)).subscribe(
        data => {
          return data;
        });
    }
}
