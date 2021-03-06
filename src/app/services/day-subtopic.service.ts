import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DaySubTopic } from '../models/day-subtopic';

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
export class DaySubtopicService {

  /**
   * The list of all the id's that allow subtopic drag and drop
   */
  dragAndDropList = [];

 /**
  * The constructor for DaySubopicService
  * @param http The dependency to be injected, in order to use an HttpClient.
  */
 constructor(private http: HttpClient) { }

 /**
  * The function used to fetch all the curriculums from the server.
  * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
  */
 getAll(): Observable<DaySubTopic[]> {
   return this.http.get<DaySubTopic[]>(environment.apiUrl + 'curriculums/subtopic/day', HTTP_OPTIONS);
 }

 /**
  * The function used to post a curriculum to a server
  * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
  */
 post(curriculumWeek: DaySubTopic): Observable<DaySubTopic> {
   return this.http.post<DaySubTopic>(environment.apiUrl + 'curriculums/subtopic/day',
   curriculumWeek, HTTP_OPTIONS);
 }

 /**
  * The function used to update a curriculum on the server
  * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
  */
 put(curriculumWeek: DaySubTopic): Observable<DaySubTopic> {
   return this.http.put<DaySubTopic>(environment.apiUrl + 'curriculums/subtopic/day',
   curriculumWeek, HTTP_OPTIONS);
 }
}
