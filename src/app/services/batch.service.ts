import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  /*
    Creates a new batch in the database

    @param  batch the new batch to add
    @return       an Observable to return the newly created batch
  */
  createBatch(batch: Batch): Observable<Batch> {
    const json = JSON.stringify(batch);
    return this.http.post<Batch>(environment.apiUrl + 'batches', json, HTTP_OPTIONS);
  }

  /*
    Returns a list of batches that the given trainer is associated with.
    Batches are not deleted so a trainer may be associated with more than
    one batch.

    @param  id  the id of the trainer
    @return     an Observable to return the list of batches
  */


  // THIS IS THE CURRENT METHOD TO GET BACK BY TRAINER ID - JOEY
 getBatchByTrainer(trainerId): Observable<Batch[]> {
   return this.http.get<Batch[]>(`http://localhost:9997/batches/trainer/${trainerId}`, HTTP_OPTIONS);

 }
  getBatchesByTrainerId(id: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.apiUrl + `batches?trainer_id=${id}`, HTTP_OPTIONS);
  }
}
