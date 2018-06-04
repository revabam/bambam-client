import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {

  message = new Subject<string[]>();
  public messageObservable = this.message.asObservable();

  constructor() { }

  alert(type: string, message: string) {
    this.message.next([type, message]);
  }

}
