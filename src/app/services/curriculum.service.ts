import { Injectable } from '@angular/core';
/*
 * HttpClient - What we use to make the http request.
 * HttpHeaders - What we need to pass in to the http request
 * in order to define the Content-Type.
 * Observable - The type of object returned by the http request,
 * in order to enable us to get the response asynchronously.
 * Curriculum - The model that this current service pertains to.
 * Environment - Contains the server endpoint that we're making
 * the HTTP Request to.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curriculum } from '../models/curriculum';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurriculumWeek } from '../models/curriculum-week';

// The content type for our HTTP requests is JSON.
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * Since the environment variable are all over the place switching between the server side endpoints
 * and the client side json server is slightly more tricky than it should be. To hit the json server
 * make sure you are pointing to an environment variable that has the localhost port 3000 string.
 *
 * @author Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
 */
@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  // The dependency to be injected, in order to use an HttpClient.
  constructor(private http: HttpClient) { }
   curriculums = this.getAll().subscribe();


   // get items by week.
   getCurriculumByWeek(id) {
    return this.http.get(`http://localhost:9996/curriculums/weeks/${id}`, HTTP_OPTIONS);
  }

  /**
   * The function used to fetch all the curriculums from the server.
   */
  getAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>('http://localhost:9996/curriculums', HTTP_OPTIONS);
  }


  /**
   * The function used to post a curriculum to a server
   */
  post(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>('http://localhost:9996/curriculums',
      curriculum, HTTP_OPTIONS);
  }

  /**
   * The function used to update a curriculum on the server
   */
  put(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.put<Curriculum>('http://localhost:9996/curriculums',
      curriculum, HTTP_OPTIONS);
  }

  /**
   * The function used to deactivate a curriculum in the server
   */
  deactivate(curriculum: Curriculum): Observable<Object> {
    curriculum.name = this.deactivateName(curriculum.name);
    return this.http.put(`http://localhost:9996/curriculums/${curriculum.id}`,
      curriculum, HTTP_OPTIONS);
  }

  /**
   * The function used to reactivate a curriculum in theserver
   */
  reactivate(curriculum: Curriculum): Observable<Object> {
    curriculum.name = this.reactivateName(curriculum.name);
    return this.http.put(`http://localhost:9996/curriculums/${curriculum.id}`,
      curriculum, HTTP_OPTIONS);
  }

  /**
   * Helper function to append '(DEACTIVATED) ' to the
   * beginning of the curriculum name, to show that
   * the curriculum is deactivated.
   * @param curriculumName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  deactivateName(curriculumName: string): string {
    return '(DEACTIVATED) ' + curriculumName;
  }

  /**
   * Helper function to remove '(DEACTIVATED) ' from the
   * beginning of the curriculum name
   * @param curriculumName - The string that we want to
   * append '(DEACTIVATED) ' to.
   */
  reactivateName(curriculumName: string): string {
    if (curriculumName.indexOf('(DEACTIVATED) ') >= 0) {
      curriculumName = curriculumName.substring(
        curriculumName.lastIndexOf('(DEACTIVATED) ')
        + ('(DEACTIVATED) ').length
      );
    }
    return curriculumName;
  }
}
