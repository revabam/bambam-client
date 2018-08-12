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
  login(email: string, password: string): Observable<BamUser> {
    console.log('[LOG] - In UserService.login()');
    return this.http.get<BamUser>(environment.apiUrl + 'users?email=' + email, HTTP_OPTIONS);
  }

  register(user: BamUser): Observable<BamUser> {
    console.log('[LOG] - In UserService.register()');
    return this.http.post<BamUser>(environment.apiUrl + 'users', JSON.stringify(user), HTTP_OPTIONS);
  }
}
