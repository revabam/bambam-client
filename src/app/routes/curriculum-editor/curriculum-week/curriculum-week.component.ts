import { TopicService } from './../../../services/topic.service';
import { CurriculumDay } from './../../../models/curriculum-day';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { DaySubTopic } from '../../../models/day-subtopic';

/**
 * Allows user to a curriculums week.
 */
@Component({
  selector: 'app-curriculum-week',
  templateUrl: './curriculum-week.component.html',
  styleUrls: ['./curriculum-week.component.css']
})
export class CurriculumWeekComponent implements OnInit {

  @Input() status: number;
  /**
   * Used to pull the object keys from the subTopicInfo key value pair object
   */
  objectKeys = Object.keys;
  topicInfo = {};
  @Input() week: CurriculumWeek;
  @Output() weekChange: EventEmitter<CurriculumWeek> = new EventEmitter<CurriculumWeek>();
  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.updateTopicInfo();
  }

  /**
   * id called when a day has been changed
   * @param event the new day to update with
   */
  onDayChange(event: CurriculumDay) {
    const index = this.week.curriculumDays.findIndex(x => x.dayNum === event.dayNum);
    this.week.curriculumDays[index] = event;
    this.updateTopicInfo();
    this.weekChange.emit(this.week);
  }

  /**
   * updates the topic information to be shown for each week
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  updateTopicInfo() {
    this.topicInfo = {};
    for (let i = 0; i < this.week.curriculumDays.length; i++) {
      const day = this.week.curriculumDays[i];
      day.daySubTopics.forEach((subTopic: DaySubTopic) => {
        const topicId = subTopic.parentTopicId;
        let topicName: string;
        if (this.topicService.topics) {
          this.topicService.topics.forEach((topic) => {
            if (topic.id === topicId) {
              topicName = topic.name;
            }
          });
          if (this.topicInfo[topicName]) {
            this.topicInfo[topicName]++;
          } else {
            this.topicInfo[topicName] = 1;
          }
        } else {
          this.topicService.getAll().subscribe((topics) => {
            if (topics) {
              this.topicService.topics = topics;
              this.updateTopicInfo();
            }
          });
        }
      });
    }
  }

}
