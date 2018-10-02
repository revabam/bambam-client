import { SubTopic } from './../../../models/subtopic';
import { TopicService } from './../../../services/topic.service';
import { CurriculumDay } from './../../../models/curriculum-day';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

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

  onDayChange(event: CurriculumDay) {
    console.log('dayChanged');
    console.log(event);
    const index = this.week.curriculumDays.findIndex(x => x.dayNum === event.dayNum);
    this.week.curriculumDays[index] = event;
    this.updateTopicInfo();
    this.weekChange.emit(this.week);
  }

  updateTopicInfo() {
    this.topicInfo = {};
    for (let i = 0; i < this.week.curriculumDays.length; i++) {
      const day = this.week.curriculumDays[i];

      day.SubTopic.forEach((subTopic) => {
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
