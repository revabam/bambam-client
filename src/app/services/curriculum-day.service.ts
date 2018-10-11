import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.curriculum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurriculumDay } from '../models/curriculum-day';

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
export class CurriculumDayService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the curriculums from the server.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  getAll(): Observable<CurriculumDay[]> {
    return this.http.get<CurriculumDay[]>(environment.apiUrl + 'curriculums/curriculums/days', HTTP_OPTIONS);
  }

  /**
   * The function used to post a curriculum to a server
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  post(curriculumDay: CurriculumDay): Observable<CurriculumDay> {
    return this.http.post<CurriculumDay>(environment.apiUrl + 'curriculums/curriculums/days',
    curriculumDay, HTTP_OPTIONS);
  }

  /**
   * The function used to update a curriculum on the server
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  put(curriculumDay: CurriculumDay): Observable<CurriculumDay> {
    return this.http.put<CurriculumDay>(environment.apiUrl + 'curriculums/curriculums/days',
    curriculumDay, HTTP_OPTIONS);
  }
}
