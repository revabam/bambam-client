import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curriculum } from '../models/curriculum';
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
export class CurriculumService {

  curriculum: BehaviorSubject<Curriculum> = new BehaviorSubject<Curriculum>(null);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Curriculum[]> {
    console.log('[LOG] - In CurriculumService.getAll()');
    return this.http.get<Curriculum[]>(environment.apiUrl + 'curriculums', HTTP_OPTIONS);
  }
}
