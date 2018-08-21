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
import { Subject, Observable } from 'rxjs';
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

const colors: any = {
  random: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

interface MyEvent extends CalendarEvent {
  curriculum?: Curriculum;
  numWeeks?: number;
  topics?: Topic[];
  version?: string;
  dropped?: boolean;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DoCheck {

  curriculumDataFetched = false;
  renderCalendar = false;
  showSideNav = false;

  hour = 0;

  colorNum = 0;

  newColor: string;

  activeDayIsOpen = false;

  calendarCurriculums: CalendarCurriculum[];
  calendarSubtopics: CalendarSubtopic[];
  topics: Topic[];
  subtopics: Subtopic[];
  curriculums: Curriculum[];

  curriculumEvents: MyEvent[] = [];

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: MyEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: MyEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
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
    private topicService: TopicService, private dialog: MatDialog) { }

  ngOnInit() {
    this.calendarService.getCurriculum().subscribe(response => {
      this.curriculums = response;
      this.topicService.getAll().subscribe(response2 => {
        this.topics = response2;
        this.subtopicService.getAll().subscribe(response3 => {
          this.subtopics = response3;
          this.curriculumDataFetched = true;
          this.convertCirriculum();
          // console.log(this.topics);
          // console.log(this.subtopics);
        });
      });
    });
  }

  ngDoCheck() {
    this.renderCalendar = this.curriculumDataFetched;
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  convertCirriculum() {
    // this.curriculums.forEach((curriculum) => {
    //   const currTopics = curriculum.topics;
    //   currTopics.forEach((topic) => {
    //     this.subtopicService.getSubtopicByParentId(topic.id).subscribe(response => {
    //       response.forEach((res) => {
    //         this.subtopics.push(res);
    //       });
    //       // console.log(this.subtopics);
    //     });
    //   });
    // });
    this.curriculums.forEach((curriculum) => {
      // console.log(curriculum);
      // console.log(curriculum.name);
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
          dropped: false
        });
    });
    this.curriculumEvents.forEach((curr) => {
      // console.log(curr);
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
    if (action === 'Clicked') {
      // this.modalData = { event, action };
      // this.modal.open(this.modalContent, {size: 'lg'});
      this.openDialog(event);
    } else if (action === 'Edited') {
      console.log(action);
    } else if (action === 'Deleted') {

    } else {
      if (!event.dropped) {
        console.log(event.dropped);
        event.dropped = true;
        console.log(action);
        const id: number = +event.id;
        this.calendarService.getCurriculumById(id).subscribe(curr => {
          const topicLength = curr.numberOfWeeks / curr.topics.length;
          let topicDay = 0;
          curr.topics.forEach((topic) => {
            this.subtopicService.getSubtopicByParentId(topic.id).subscribe(subResponse => {
              const subtopicTime = (topicLength * 5 * 7) / subResponse.length;
              let currTopicTime = subtopicTime;
              console.log('subtopicTime: ', subtopicTime);
              console.log('topiclength: ', topicLength);
              colors.random.primary = this.randomColor();
              this.newColor = 'color' + this.colorNum;
              colors[this.newColor] = this.randomColor();
              for (let i = 0; i < subResponse.length; i++) {
                if (isWeekend(addDays(addHours(startOfDay(event.start), 9 + this.hour), topicDay))) {
                  topicDay++;
                  if (isWeekend(addDays(addHours(startOfDay(event.start), 9 + this.hour), topicDay))) {
                    topicDay++;
                  }
                }
                if (this.hour + currTopicTime > 7) {
                  this.multidaySubtopic(subResponse[i], topicDay, (7 - this.hour), event, currTopicTime, curr);
                  topicDay++;
                  this.hour = 0;
                  currTopicTime = currTopicTime - (7 - this.hour);
                  i--;
                } else {
                  console.log('IN CREATE SOLO DAY EVENT', subResponse[i].name);
                  this.events.push(
                    {
                      start: addDays(addHours(startOfDay(event.start), 9 + this.hour), topicDay),
                      end: addDays(addHours(startOfDay(event.start), 9 + this.hour + currTopicTime), topicDay),
                      title: subResponse[i].name,
                      id: subResponse[i].id,
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
                  this.colorNum++;
                  this.hour += currTopicTime;
                }
                this.refresh.next();
              }
            });
          });
        });
      } else {
        // this.openDialog(event);
      }
    }
  }

  multidaySubtopic(subtopic: Subtopic, topicDay: number, timeLeft: number, event: MyEvent, subtopicTime: number, curr: Curriculum) {
    console.log('IN CREATE MULTIDAY EVENT', subtopic.name);
    event.dropped = true;
    this.events.push(
      {
        start: addDays(addHours(startOfDay(event.start), 9 + this.hour), topicDay),
        end: addDays(addHours(startOfDay(event.start), 17), topicDay),
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

    this.hour += subtopicTime;
  }

  // addEvent(): void {
  //   this.events.push({
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     curriculum: curr,
  //     numWeeks: curr.numberOfWeeks,
  //     topics: curr.topics
  //   });
  //   this.refresh.next();
  // }
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


