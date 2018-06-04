import { Component, OnInit, Injectable } from '@angular/core';

import { BatchService } from '../../../services/batch.service';
import { Observable } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { CalendarService } from '../../../services/calendar.service';
import { Subtopic } from '../../../models/subtopic.model';
import { ListModel } from '../../../models/list.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SessionService } from '../../../services/session.service';
import { Schedule as BatchSchedule } from '../../../models/schedule.model';
import { ScheduledSubtopic } from '../../../models/scheduledsubtopic.model';
import { SubtopicService } from '../../../services/subtopic.service';

/**
 * @author John Austin -  batch: 1712-dec11-Java-Steve
 */
@Component({
  selector: 'app-batch-progress-bar',
  templateUrl: './batch-progress-bar.component.html',
  styleUrls: ['./batch-progress-bar.component.css']
})
@Injectable()
export class BatchProgressBarComponent implements OnInit, OnChanges {

  batchId: number;
  batch: Batch;
  batchName: string;
  showSpinner = true;
  batchStart: Date;
  batchEnd: Date;
  subTopicCompleted: number;
  subTopicTotal: number;
  subTopicTotalObs: Observable<number>;
  percentCompleted: number;
  subPercentCompleted: number;
  currentDate: Date;
  completedDate: number;
  missedTopics: number;
  totalTopics: number;
  subTopicsCompleted: number;
  numSubtopics: number;
  subTopicMissed: number;
  topicArray: ListModel[];
  batchObs: Observable<Batch>;
  schedule: BatchSchedule;
  scheduledSubtopics: ScheduledSubtopic[];
  subtopics: Subtopic[];
  selectedBatch: Batch;
  constructor(private batchService: BatchService, private calendarService: CalendarService,
    private sessionService: SessionService, private subtopicService: SubtopicService) {

    this.batchId = null;
  }
  ngOnChanges() {

  }

  ngOnInit() {
    if (sessionStorage.getItem('batch') != null) {
      this.batch = JSON.parse(sessionStorage.getItem('batch'));
      this.setProperties();
    }
    this.batchSubscribe();
  }

  /**
   * @author David Graves -- batch: 1712-dec-Java-Steve
   * Subscribes to obtain current batch info to deterime start and end date, as well as current week.
   */
  batchSubscribe() {
    this.sessionService.selectedBatchSubject.subscribe(data =>  {
      this.batchId = data.id;
      this.batchObs = this.batchService.getBatchById(this.batchId);
      this.batchObs.subscribe(
        data1 => {
          if (data1 != null) {
            this.batch = data1;
            this.setProperties();
          }
        });
    });
  }

  setProperties() {
    this.selectedBatch = JSON.parse(sessionStorage.getItem('batch'));
    this.batchId = this.selectedBatch.id;

    this.calendarService.getScheduleByScheduleId(this.selectedBatch.scheduleID).subscribe(
      schedule => {
        this.schedule = schedule;
        sessionStorage.setItem('schedule', JSON.stringify(schedule));
        this.scheduledSubtopics = this.schedule.subtopics;
        const subtopicIds: number[] = [];
        this.scheduledSubtopics.forEach(element => {
          subtopicIds.push(element.subtopicId);
        });

        this.subtopicService.getSubtopicByIDs(subtopicIds).subscribe(subtopics => {
          this.subtopics = subtopics;
          for (let i = 0; i < this.scheduledSubtopics.length; i++) {
            const topicStartDate = new Date(this.selectedBatch.startDate);
            topicStartDate.setDate(topicStartDate.getDate()
              + (this.scheduledSubtopics[i].date.week - 1) * 7
              + this.scheduledSubtopics[i].date.day - 1);
            topicStartDate.setHours(((this.scheduledSubtopics[i].date.startTime / 1000 / 3600) % 24) - 4); // - 4 to adjust for EST from GMT
            subtopics[i].startTime = topicStartDate;
          }
          sessionStorage.setItem('subtopics', JSON.stringify(this.subtopics));

          this.batchService.getBatchById(this.batchId).subscribe(
            data1 => {
              this.showSpinner = false;
              this.batch = data1;
              this.currentDate = new Date();
              if ((this.currentDate.valueOf() - this.batch.startDate.valueOf() >
                this.batch.endDate.valueOf() - this.batch.startDate.valueOf())) {
                this.completedDate = this.batch.endDate.valueOf() - this.batch.startDate.valueOf();
              } else {
                this.completedDate = (this.currentDate.valueOf() - this.batch.startDate.valueOf());
              }
              this.percentCompleted = Math.floor(this.completedDate.valueOf() /
                (this.batch.endDate.valueOf() - this.batch.startDate.valueOf()) * 100);
            });


          this.numSubtopics = null;
          this.numSubtopics = this.subtopics.length;
          this.topicArray = [];
          if (this.numSubtopics == null) {
            this.subTopicCompleted = null;
            this.subTopicMissed = 0;
          } else {
            this.subTopicMissed = 0;
            this.subTopicCompleted = 0;
            this.subPercentCompleted = 0;
            this.subTopicTotal = this.subtopics.length;
            for (let i = 0; i < this.subtopics.length; i++) {
              if (this.subtopics[i].status === 'Planned' || this.subtopics[i].status === 'Completed') {
                this.subTopicCompleted += 1;
              }
              if (this.subtopics[i].status === 'Missed') {
                const subTopicName = this.subtopics[i].subtopicName;
                const topicName = this.subtopics[i].parentTopic.topicName;
                this.subTopicMissed += 1;
                if (this.subtopics[i].parentTopic) {
                  // if topicArray is null;
                  if (this.topicArray == null) {
                    const listModel = new ListModel(topicName);
                    listModel.listItems.push(subTopicName);
                    this.topicArray.push(listModel);
                  }
                  let topicNameExists = false;
                  for (let j = 0; j < this.topicArray.length; j++) {
                    if (this.topicArray[j].listName === topicName) {
                      topicNameExists = true;
                      this.topicArray[j].listItems.push(subTopicName);
                    }
                  }
                  if (!topicNameExists) {
                    const listModel = new ListModel(topicName);
                    listModel.listItems.push(subTopicName);
                    this.topicArray.push(listModel);
                  }
                }
              }
              // subtopic percent complete
              this.subPercentCompleted = Math.floor((this.subTopicCompleted * 100) / this.subTopicTotal);
            }
          }

          this.subTopicTotal = this.schedule.subtopics.length;
          this.subTopicCompleted = 0;

          if (this.sessionService.getSelectedBatch() != null) {
            this.sessionService.putSelectedBatchIntoSession(this.sessionService.getSelectedBatch());
          }
        });
      }
    );
  }
}
