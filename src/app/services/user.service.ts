import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BamUser } from '../models/bam-user';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<BamUser> = new BehaviorSubject<BamUser>(null);

  constructor(private http: HttpClient) { }

  /**
  * This method will get user info from the database based on
  * the email address. This method is called from the login
  * component to get the user's info.
  *
  * IMPORTANT:
  * This may need to be changed in future sprints when the
  * microservices backend is connected. Depending on how
  * the services are setup, the http request may not actually
  * function.
  *
  * @param  email The user's email address
  *
  * @return       An Observable which will broadcast the BamUser when it is retrieved
  */
  getUserByEmail(email: string): Observable<BamUser> {
    return this.http.get<BamUser>(environment.apiUrl + 'users?email=' + email, HTTP_OPTIONS);
  }

  /**
  * This method will add a new user to the database.
  *
  * @param  user  A BamUser object that contains the user data
  *
  * @return       An Observable that will broadcast the BamUser when it has been inserted into the database
  */
  register(user: BamUser): Observable<BamUser> {
    return this.http.post<BamUser>(environment.apiUrl + 'users', JSON.stringify(user), HTTP_OPTIONS);
  }

  /**
   * This method is used to update the user's info in the database.
   * It's called from the dashboard component when the user edits their
   * personal information.
   * @param user The updated user
   */
  updateInfo(user: BamUser): Observable<BamUser> {
    return this.http.put<BamUser>(environment.apiUrl + `users/${user.id}`, JSON.stringify(user),  HTTP_OPTIONS);
  }
}
