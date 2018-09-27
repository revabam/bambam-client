import { CurriculumDay } from './../../../models/curriculum-day';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-curriculum-day',
  templateUrl: './curriculum-day.component.html',
  styleUrls: ['./curriculum-day.component.css']
})
export class CurriculumDayComponent implements OnInit {

  @Input() day: CurriculumDay;
  @Output() dayChange: EventEmitter<CurriculumDay> = new EventEmitter<CurriculumDay>();
  constructor() { }

  ngOnInit() {
  }

  /**
   * Adds the subtopic to the subtopic list in this.day
   * @param event the passed in subtopic
   */
  onSubTopicDrop(event: any) {
    console.log('Recieved event');
    console.log(event);
    console.log(event.dragData);
    this.day.subTopics.push(event.dragData);
    this.dayChange.emit(this.day);
  }
}
