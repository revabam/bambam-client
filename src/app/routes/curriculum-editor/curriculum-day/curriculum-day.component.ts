import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SubTopic } from './../../../models/subtopic';
import { CurriculumDay } from './../../../models/curriculum-day';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { DaySubtopicService } from '../../../services/day-subtopic.service';

@Component({
  selector: 'app-curriculum-day',
  templateUrl: './curriculum-day.component.html',
  styleUrls: ['./curriculum-day.component.css']
})
export class CurriculumDayComponent implements OnInit {

  @Input() day: CurriculumDay;
  @Output() dayChange: EventEmitter<CurriculumDay> = new EventEmitter<CurriculumDay>();

  constructor(
    public daySubTopicService: DaySubtopicService
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('dropped');
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.dayChange.emit(this.day);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dayChange.emit(this.day);
    }
  }

  /**
   * Adds the subtopic to the subtopic list in this.day
   * @param event the passed in subtopic
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  onSubTopicDrop(event: any) {
    console.log('Recieved event');
    console.log(event);
    console.log(event.dragData);
    // TODO: needs to not just be added to the end, but the location the user dragged it to.
    this.day.daySubTopics.push(event.dragData);
    this.dayChange.emit(this.day);
  }
  /**
   * Allows for drag and drop rearrangement of the subtopics in this.day
   * @param event event passed in from a drag and drop that gives information about the location of the dropped object
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  onSubTopicRearranged(event: any) {
    console.log('subTopic rearranged');
    console.log(event);
    const previousIndex: number = event.previousIndex;
    const currentIndex: number = event.currentIndex;
    const previousSubTopic = this.day.daySubTopics[previousIndex];
    const currentSubTop = this.day.daySubTopics[currentIndex];

    // Swap the subtopics
    this.day.daySubTopics.splice(previousIndex, 1, currentSubTop);
    this.day.daySubTopics.splice(currentIndex, 1, previousSubTopic);

    // Tells parent that there has been a change to day variable
    this.dayChange.emit(this.day);
  }
  /**
   * Removes a subtopic from the subtopic list in this.day.
   * @param index index of the subtopic to remove
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  removeSubTopic(index: number) {
    this.day.daySubTopics.splice(index, 1);
    // Tells parent that there has been a change to day variable
    this.dayChange.emit(this.day);
  }
}
