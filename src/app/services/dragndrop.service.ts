import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DragndropService {

  /**Setting a subtopic to a behavioral subject to allow the variable to be
   * subscribed to
   * @author Carter Taylor, Mohamad Alhindi, James Holzer
   */
  private subtopic = new BehaviorSubject<any>(null);
  currentSubtopic = this.subtopic.asObservable();

  constructor() { }

  /**This method takes in a subtopic and sets it as an observable such that
   * any component can subcribe to the variable to get its content
   * @author Carter Taylor, Mohamad Alhindi, James Holzer
   * @param subtopic
   */
  sendSubtopic(subtopic) {
    this.subtopic.next(subtopic);
  }

}
