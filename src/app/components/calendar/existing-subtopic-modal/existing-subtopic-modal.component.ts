import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subtopic } from '../../../models/subtopic.model';

/**
 *  This component opens a modal that checks if the user wishes to add an existing subtopic to the calendar.
 *
 * 	@author Sean Sung (1712-dec10-java-Steve)
**/

declare var $: any;

@Component({
  selector: 'app-existing-subtopic-modal',
  templateUrl: './existing-subtopic-modal.component.html',
  styleUrls: ['./existing-subtopic-modal.component.css']
})
export class ExistingSubtopicModalComponent implements OnInit {
  @Input()
  subtopic: Subtopic;
  @Output()
  addExistingSubtopicEvent: EventEmitter<Subtopic> = new EventEmitter<Subtopic>();

  constructor() { }

  ngOnInit() {
  }

   /**
   * Calls calendar component to do add
   */
  addExistingSubtopic() {
    this.addExistingSubtopicEvent.emit(this.subtopic);
    $('#add-existing-subtopic-modal').modal('hide');
  }
}
