import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoomService {

  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<any[]>(`http://localhost:9994/calendars/event`);
  }
  getAllBatches() {
    return this.http.get<any[]>(`http://localhost:9997/batches`);
  }
  getAllCurriculums() {
    return this.http.get<any[]>(`http://localhost:9996/curriculums`);
  }
}
