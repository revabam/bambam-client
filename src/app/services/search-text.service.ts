import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Used to communicate between TopicSearch, SubtopicSearch, and TopicPool components. Search components send search bar input to
 * topic pool to filter displayed topics/subtopics
 * @author Mohamed Swelam
 * @author Dylan Britton
 * @author Allan Poindexter
 * @author David Graves
 * @author Charlie Harris
 * @batch 1712-Dec11-2017
 * */
@Injectable()
export class SearchTextService {

  private TopicSubject = new Subject<any>();

  constructor() { }

  /**
   * Pushes a message viewable by any components subscribing to the TopicSearch
   * @param text The contents of the message
   * @param type Used to target a component as the recipient of the message
   */
  sendMessage(text: string, type: string) {
    this.TopicSubject.next({
      type: type,
      text: text
     });
  }

  /**
   * Clears the current message
   */
  clearMessage() {
      this.TopicSubject.next();
  }

  /**
   * Returns an observable containing all future messages. Subscribe to the observable to receive messages from this service
   */
  getMessage(): Observable<any> {
      return this.TopicSubject.asObservable();
  }

}
