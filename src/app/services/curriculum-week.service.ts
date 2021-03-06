import { environment } from './../../environments/environment';
import { CurriculumWeek } from './../models/curriculum-week';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export class CurriculumWeekService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }

  /**
   * The function used to fetch all the curriculums from the server.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  getAll(): Observable<CurriculumWeek[]> {
    return this.http.get<CurriculumWeek[]>(environment.apiUrl + 'curriculums/curriculums/weeks', HTTP_OPTIONS);
  }

  /**
   * The function used to post a curriculum to a server
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  post(curriculumWeek: CurriculumWeek): Observable<CurriculumWeek> {
    return this.http.post<CurriculumWeek>(environment.apiUrl + 'curriculums/curriculums/weeks',
    curriculumWeek, HTTP_OPTIONS);
  }

  /**
   * The function used to update a curriculum on the server
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  put(curriculumWeek: CurriculumWeek): Observable<CurriculumWeek> {
    return this.http.put<CurriculumWeek>(environment.apiUrl + 'curriculums/curriculums/weeks',
    curriculumWeek, HTTP_OPTIONS);
  }
}
