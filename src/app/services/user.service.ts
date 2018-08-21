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

  // registerUser(user: BamUser): Observable<BamUser> {
  //   console.log('[LOG] - In UserService.registerUser()');
  //   const json = JSON.stringify(user);
  //   return this.http.post<BamUser>(environment.apiUrl + 'users', json, HTTP_OPTIONS);
  // }

  /*
    Add comments here
  */
  login(email: string, password: string): Observable<BamUser[]> {
    console.log('[LOG] - In UserService.login()');
    return this.http.get<BamUser[]>(environment.apiUrl + 'users?email=' + email, HTTP_OPTIONS);
  }

  /*
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
    console.log('[LOG] - In UserService.getUserByEmail()');
    return this.http.get<BamUser>(environment.apiUrl + 'users?email=' + email, HTTP_OPTIONS);
  }

  /*
  * This method will add a new user to the database.
  *
  * @param  user  A BamUser object that contains the user data
  *
  * @return       An Observable that will broadcast the BamUser when it has been inserted into the database
  */
  register(user: BamUser): Observable<BamUser> {
    console.log('[LOG] - In UserService.register()');
    return this.http.post<BamUser>(environment.apiUrl + 'users', JSON.stringify(user), HTTP_OPTIONS);
  }

  deleteById(id: number) {
    console.log('[LOG] - In UserService.deleteById()');
    this.http.delete(environment.apiUrl + `users/${id}`);
  }

  updateInfo(user: BamUser): Observable<BamUser> {
    console.log('[LOG] - In UserService.updateInfo()');
    return this.http.put<BamUser>(environment.apiUrl + `users/${user.id}`, JSON.stringify(user),  HTTP_OPTIONS);
  }
}
