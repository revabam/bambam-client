import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  DoCheck,
  Inject
} from '@angular/core';
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addWeeks, isWeekend
} from 'date-fns';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CalendarService } from '../../../services/calendar.service';
import { Curriculum } from '../../../models/curriculum';
import { CalendarCurriculum } from '../../../models/calendar-curriculum';
import { CalendarSubtopic } from '../../../models/calendar-subtopic';
import { Subtopic } from '../../../models/subtopic';
import { SubtopicService } from '../../../services/subtopic.service';
import { TopicService } from '../../../services/topic.service';
import { Topic } from '../../../models/topic';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import * as cal_event from '../../../models/calendar-event';
import { BamUser } from '../../../models/bam-user';
import { BatchService } from '../../../services/batch/batch.service';
import { EventColor, EventAction } from '../../../../../node_modules/calendar-utils';

const colors: any = {
  random: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

export interface MyEvent extends CalendarEvent {
  curriculum?: Curriculum;
  numWeeks?: number;
  topics?: Topic[];
  version?: number;
  dropped?: boolean;
  parentTopic_id?: number;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DoCheck {

  user: BamUser = JSON.parse(sessionStorage.getItem('user'));
  curriculumDataFetched = false;
  renderCalendar = false;
  showSideNav = false;

  hour = 0;
  subtopicsReceivedCount = 0;
  topicLength = 0;
  topicArr: Topic[];
  subtopicArrArr: Array<Subtopic[]> = [];
  subTopicsReceived = false;
  multiDayEventCreated = false;
  dropEvent: MyEvent;
  selectedCurriculum: Curriculum;
  colorNum = 0;

  storedEvents: cal_event.CalendarEvent[] = null;

  newSubtopicName: string;
  newSubtopicDate: Date;

  initialRender = false;

  newColor: string;

  activeDayIsOpen = false;

  calendarCurriculums: CalendarCurriculum[];
  calendarSubtopics: CalendarSubtopic[];
  topics: Topic[];
  subtopics: Subtopic[];
  curriculums: Curriculum[];
  currTopicTime: number;

  curriculumEvents: MyEvent[] = [];

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: MyEvent;
  };

  actions: CalendarEventAction[] = [
    /* Pencil label (icon) is not rendering correctly.
    Removed for now until solution is found. */

    // {
    //   label: '<i class="fa fa-fw fa-pencil"></i>',
    //   onClick: ({ event }: { event: MyEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   }
    // },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: MyEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: MyEvent[] = [];

  constructor(private modal: NgbModal, private calendarService: CalendarService, private subtopicService: SubtopicService,
    private topicService: TopicService, private dialog: MatDialog, private batchService: BatchService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.calendarService.getCalendarEvents().subscribe(response => {
      console.log(response.length);
      this.storedEvents = response;
      this.initialRender = true;
    });

    this.calendarService.getCurriculum().subscribe(response => {
      this.curriculums = response;
      this.topicService.getAll().subscribe(response2 => {
        this.topics = response2;
        this.subtopicService.getAll().subscribe(response3 => {
          this.subtopics = response3;
          this.curriculumDataFetched = true;
          this.convertCirriculum();
        });
      });
    });
  }

  ngDoCheck() {
    if (this.storedEvents != null && this.initialRender) {
      console.log('refreshing');
      // console.log(this.events);
      // this.refresh.next();
      this.initialRender = false;
      this.generateStoredEvents();
    }
    this.renderCalendar = this.curriculumDataFetched;
    if (this.subTopicsReceived && this.subtopicsReceivedCount === 0) {
      console.log();
      console.log('Begining event generation...');
      this.generateEvents();
    }
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  convertCirriculum() {
    this.curriculums.forEach((curriculum) => {
      this.curriculumEvents.push(
        {
          start: (startOfDay(new Date())),
          end: addWeeks(new Date(), curriculum.numberOfWeeks),
          title: curriculum.name,
          id: curriculum.id,
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          dropped: false,
          version: curriculum.version
        });
    });
  }

  dayClicked({ date, events }: { date: Date; events: MyEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  openDialog(event: MyEvent): void {
    console.log(event);
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    let eventTopic: Topic;
    this.topicService.getTopicById(+event.id).subscribe(response => {
      eventTopic = response;
    });
    const dialogRef = this.dialog.open(CalendarModalComponent,
      /*
      * An object is passed in as the second parameter, which
      * defines properties of the dialog modal, as well as the
      * data that we'll pass in for the modal component to access.
      */
      {
        width: '600px',
        data: {
          title: event.title,
          topics: event.topics,
          curriculum: event.curriculum,
          version: event.version,
          numWeeks: event.numWeeks
        }
      }
    );
  }

  handleEvent(action: string, event: MyEvent): void {
    console.log('[LOG] - In handleEvent()');
    if (action === 'Clicked') {
      this.openDialog(event);
    } else if (action === 'Edited') {
    } else if (action === 'Deleted') {
    } else {
      if (!event.dropped) {
        event.dropped = true;
        const id: number = +event.id;
        this.calendarService.getCurriculumById(id).subscribe(curr => {
          this.selectedCurriculum = curr;
          // console.log('number of weeks: ' + curr.numberOfWeeks);
          // console.log('number of topics: ' + curr.topics.length);
          this.topicLength = curr.numberOfWeeks / curr.topics.length;
          // console.log('topicLength: ' + this.topicLength);
          this.topicArr = curr.topics;
          for (let i = 0, j = 0; i < curr.topics.length; i++) {
            this.subtopicService.getSubtopicByParentId(curr.topics[i].id).subscribe(subResponse => {
              this.subtopicArrArr.push(subResponse);
              if (i === curr.topics.length - 1) {
                this.subTopicsReceived = true;
              }
            });
          }
          this.dropEvent = event;
        });
      } else {
      }
    }
  }

  generateStoredEvents() {
    for (let i = 0; i < this.storedEvents.length; i++) {
      this.events.push(
        {
          start: new Date(this.storedEvents[i].startDateTime),
          end: new Date(this.storedEvents[i].endDateTime),
          title: this.storedEvents[i].title,
          id: this.storedEvents[i].id,
          color: this.storedEvents[i].color as EventColor,
          actions: [this.storedEvents[i].actions as EventAction],
          resizable: this.storedEvents[i].resizable,
          draggable: this.storedEvents[i].draggable,
          curriculum: this.storedEvents[i].curriculum,
          numWeeks: this.storedEvents[i].numWeeks,
          topics: this.storedEvents[i].topics,
          version: this.storedEvents[i].version,
          dropped: this.storedEvents[i].dropped
        });
    }
    this.refresh.next();
  }

  /*
    Assumes that each topic contains at least 1 sub topic per day
  */
  generateEvents() {
    this.subTopicsReceived = false;
    // console.log('subtopics Received set to false');
    this.subtopicsReceivedCount++;
    // console.log('count incremented');
    // console.log();
    let topicDay = 0;
    for (let j = 0; j < this.topicArr.length; j++) {
      const subtopicTime = (this.topicLength * 5 * 7) / this.subtopicArrArr[j].length;
      this.currTopicTime = subtopicTime;

      for (let i = 0; i < this.subtopicArrArr[j].length; i++) {
        if (isWeekend(addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay))) {
          topicDay++;
          if (isWeekend(addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay))) {
            topicDay++;
          }
        }
        // console.log();
        // console.log(this.hour + 'This.hour');
        // console.log();
        if (this.hour + this.currTopicTime > 7 && !this.multiDayEventCreated) {
          this.multidaySubtopic(this.subtopicArrArr[j][i], topicDay, (7 - this.hour), this.dropEvent, this.selectedCurriculum);
          topicDay++;
          // if (this.multiDayEventCreated) {
          //   // console.log(this.currTopicTime + ' this.hour = ' + (7 - this.hour));
          //   // console.log(this.currTopicTime + ' this.hour = ' + (this.hour));
          //   this.currTopicTime = this.currTopicTime - 7 - this.hour;
          // } else {
          //   this.currTopicTime = this.currTopicTime - 7;
          // }
          // this.hour = 0;
          i--;
        } else {
          this.events.push(
            {
              start: addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay),
              end: addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour + this.currTopicTime), topicDay),
              title: this.subtopicArrArr[j][i].name,
              id: this.subtopicArrArr[j][i].id,
              color: colors.newColor,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: true,
              curriculum: this.selectedCurriculum,
              numWeeks: this.selectedCurriculum.numberOfWeeks,
              topics: this.selectedCurriculum.topics,
              version: this.selectedCurriculum.version,
              dropped: true,
              parentTopic_id: this.subtopicArrArr[j][i].parentTopic_id
            }
          );
          this.persistEvent(this.events[this.events.length - 1]);
          console.log('start: ' + this.events[this.events.length - 1].start);
          this.colorNum++;
          this.hour += this.currTopicTime;
          this.currTopicTime = subtopicTime;
          this.multiDayEventCreated = false;
        }
        this.refresh.next();
      }
    }
    this.persistCurriculum(this.selectedCurriculum);

  }

  multidaySubtopic(subtopic: Subtopic, topicDay: number, timeLeft: number, event: MyEvent, curr: Curriculum) {
    // console.log('IN CREATE MULTIDAY EVENT', subtopic.name);
    event.dropped = true;
    // console.log(event);
    this.events.push(
      {
        start: addDays(addHours(startOfDay(event.start), 9 + this.hour), topicDay),
        end: addDays(addHours(startOfDay(event.start), 16), topicDay),
        title: subtopic.name,
        id: subtopic.id,
        color: colors.newColor,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true,
        curriculum: curr,
        numWeeks: curr.numberOfWeeks,
        topics: curr.topics,
        version: curr.version,
        dropped: true
      }
    );
    // console.log('start: ' + this.events[this.events.length - 1].start);
    this.currTopicTime = this.currTopicTime - timeLeft;
    // this.hour = 7;
    this.hour = 0;
    this.multiDayEventCreated = true;
  }

  persistEvent(event: MyEvent) {
    const subtopic: CalendarSubtopic = {
      subtopic_id: +event.id
    };
    // console.log(subtopic.name);
    // console.log(subtopic.parentTopic_id);
    const calEvent: cal_event.CalendarEvent = {
      title: event.title,
      description: event.title,
      status_id: 0,
      startDateTime: event.start,
      endDateTime: event.end,
      calendarSubtopic_id: +event.id,
      user_id: this.user.id,
      resizable: event.resizable,
      color: event.color,
      actions: event.actions,
      draggable: event.draggable,
      curriculum: event.curriculum,
      numWeeks: event.numWeeks,
      topics: event.topics,
      version: event.version,
      dropped: event.dropped
    };
    console.log('Persisting calEvent: ', calEvent);
    this.calendarService.addCalendarEvent(calEvent).subscribe(eventRes => {
      // console.log(eventRes);
    },
      err => {
        console.log(err.message);
      });
    // this.calendarService.addCalendarSubtopic(subtopic).subscribe(subtopicRes => {
    //   console.log(subtopicRes);
    // });
  }

  persistCurriculum(curriculum: Curriculum) {
    let batchId = 0;
    this.batchService.getBatchesByTrainerId(this.user.id).subscribe(batches => {
      // console.log(batches);
      if (batches === []) {
        batchId = batches[0].id;
      }
    });
    const calCurriculum: CalendarCurriculum = {
      curriculum_id: curriculum.id,
      batch_id: batchId
    };
    this.calendarService.addCalendarCirriculum(calCurriculum).subscribe(curr => {
      console.log(curr);
    });
  }

  addEvent(): void {
    this.events.push({
      title: this.newSubtopicName,
      start: addHours(this.newSubtopicDate, 9),
      end: addHours(this.newSubtopicDate, 10),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal-component.html'
})
export class CalendarModalComponent {

  /**
  * @param dialogRef - The reference to the dialog using our
  * component, which allows us to close the dialog when we're
  * done.
  * @param data - Received from the parent component
  * of this modal component, enabling the current component
  * to retrieve and update what's in the parent component
  */
  constructor(private dialogRef: MatDialogRef<CalendarModalComponent>, @Inject(MAT_DIALOG_DATA) public data: object) { }

  close() {
    this.dialogRef.close();
  }
}


