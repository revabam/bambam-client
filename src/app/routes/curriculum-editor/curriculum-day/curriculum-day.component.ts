import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SubTopic } from './../../../models/subtopic';
import { CurriculumDay } from './../../../models/curriculum-day';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { DaySubtopicService } from '../../../services/day-subtopic.service';
import { DaySubTopic } from '../../../models/day-subtopic';

@Component({
  selector: 'app-curriculum-day',
  templateUrl: './curriculum-day.component.html',
  styleUrls: ['./curriculum-day.scss']
})
export class CurriculumDayComponent implements OnInit {

  @Input() day: CurriculumDay;
  @Output() dayChange: EventEmitter<CurriculumDay> = new EventEmitter<CurriculumDay>();

  constructor(
    public daySubTopicService: DaySubtopicService
  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any>) {
    if (!event.previousContainer || !event.previousContainer.data || !event.previousContainer.data.length) {
      // This means that it is a subtopic from the topic pool and should be converted into a day-subtopic
      console.log('from topic pool');
      const daySubTopic: DaySubTopic = {
        dayId: this.day.id,
        index: event.currentIndex,
        name: event.previousContainer.data.name,
        parentTopicId: event.previousContainer.data.parentTopicId,
        subTopicId: event.previousContainer.data.id
      };

      // Saving daySubTopic to db
      this.daySubTopicService.post(daySubTopic).subscribe((savedDaySubTopic) => {
        this.day.daySubTopics.splice(event.currentIndex, 0, savedDaySubTopic);
        this.updateDaySubTopicIndexes();
      });
    } else {
      // This is a transfer of daySubTopic from one day to either the same day or another day
      if (event.previousContainer === event.container) {
        // rearranges the daySubTopics
        console.log('rearranging');
        this.onSubTopicRearranged(event);
      } else {
        // transfer from one day to another
        console.log('transfering');
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this.updateDaySubTopicIndexes();
      }
    }
  }

  updateDaySubTopicIndexes() {
    for (let i = 0; i < this.day.daySubTopics.length; i++) {
      const daySubTopic = this.day.daySubTopics[i];
      daySubTopic.index = i;
      this.daySubTopicService.put(daySubTopic).subscribe();
    }
    this.dayChange.emit(this.day);
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

    // updates indexes
    this.updateDaySubTopicIndexes();
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
