import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, DoCheck, Inject } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addWeeks, isWeekend } from 'date-fns';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as cal_event from '../../models/calendar-event';
import { BamUser } from '../../models/bam-user';
import { BatchService } from '../../services/batch.service';
import { EventColor, EventAction } from 'calendar-utils';
import { EventDuplicateModalComponent } from './event-duplicate-modal/event-duplicate-modal.component';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { Topic } from '../../models/topic';
import { SubTopic } from '../../models/subtopic';
import { Curriculum } from '../../models/curriculum';
import { CalendarCurriculum } from '../../models/calendar-curriculum';
import { CalendarSubtopic } from '../../models/calendar-subtopic';
import { TopicService } from '../../services/topic.service';
import { CalendarService } from '../../services/calendar.service';
import { SubTopicService } from '../../services/subtopic.service';
import { StartMondayModalComponent } from './start-monday-modal/start-monday-modal.component';
import { CurriculumWeek } from '../../models/curriculum-week';

const colors: any = {
  random: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DoCheck {

  user: BamUser = JSON.parse(sessionStorage.getItem('user'));
  showSideNav = true;

  hour = 0;
  subTopicsReceived = false;
  multiDayEventCreated = false;
  selectedCurriculum: Curriculum;
  colorNum = 0;

  docheck = true;
  storedEvents: cal_event.CalendarEvent[] = null;

  newSubtopicName: string;
  newSubtopicDate: Date;

  initialRender = false;

  newColor: string;

  activeDayIsOpen = false;
  dropEvent: CalendarEvent;
  curriculums: Curriculum[];
  currTopicTime: number;

  curriculumEvents: CalendarEvent[] = null;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<span><mat-icon>edit</mat-icon></span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  constructor(private modal: NgbModal, private calendarService: CalendarService, private subtopicService: SubTopicService,
    private topicService: TopicService, private dialog: MatDialog, private batchService: BatchService) { }

  /**
   * Life hook for loading all calendar services
   */
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.calendarService.getCalendarEventsList().subscribe(response => {
      this.storedEvents = response;
      this.initialRender = true;
    });

    this.calendarService.getCurriculum().subscribe(response => {
      this.curriculums = response;
      this.convertCirriculum();
    });
  }

  /**
   * Lifehook for generating events after the service has returned them from onInit.
   */
  ngDoCheck() {
    if (this.storedEvents != null && this.initialRender) {
      this.initialRender = false;
      this.generateStoredEvents();
    }
    if (this.selectedCurriculum != null && this.docheck) {
      this.docheck = false;
      console.log('generate');
      this.generateEvents();
    }
    this.refresh.next();
  }

  /**
   * toggles the side nav for creating events and draging curriculum on to the calendar.
   */
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }
  /**
   * Convert cirriculums into Material CalendarEvents so they can be dropped onto the calendar
   * and stored.
   */
  convertCirriculum() {
    this.curriculumEvents = [];
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
          draggable: true
        });
    });
    // next line reloads the AngularMaterials
    this.refresh.next();
  }

  /**
   * Built in method from angular material2 calendar.
   * Handles clicks on days.
   * @param param0 An object that holds the date clicked and the events on that day.
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
      this.viewDate = date;
    }
  }

  /**
   * Built in method from angular material2 calendar.
   * Handles time changes for events.
   * @param param0 A wrapper object that stores the event, its new starting time, and ending time.
   */
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
  }
  /**
   * Should be used for creating a random color for the curriculum when it is dropped on the calendar
   * but it is not implemented.
   */
  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  /**
   * When the title of an event on the calendar is clicked, a modal is opened with relevant
   * information about the event (curriculum, topics, etc.).
   * @param event The event that was clicked
   */
  openDialog(event: CalendarEvent): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    let eventTopic: Topic;
    this.topicService.getTopicById(+event.id).subscribe(response => {
      eventTopic = response;
      let curriculum: Curriculum;
      this.curriculums.forEach(curr => {
        curr.topics.forEach(topic => {
          if (topic = eventTopic) {
            curriculum = curr;
          }
        });
      });
      this.dialog.open(CalendarModalComponent,
        /*
        * An object is passed in as the second parameter, which
        * defines properties of the dialog modal, as well as the
        * data that we'll pass in for the modal component to access.
        */
        {
          width: '600px',
          data: {
            title: curriculum.name,
            topics: curriculum.topics,
            curriculum: curriculum,
            version: curriculum.version,
            numWeeks: curriculum.numberOfWeeks
          }
        }
      );
    });
  }

  /**
   * displays the modal for creating a duplicate event
   * @param name of the duplicate event
   * @param date of the duplicate event
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  openEventDuplicateDialog(name: string, date: Date) {
    console.log(date.getDay());
    const dialogRef = this.dialog.open(EventDuplicateModalComponent,
      {
        width: '600px',
        data: {
          eventName: name,
          eventDate: date,
          decision: false
        }
      });

    dialogRef.afterClosed().subscribe(decision => {
      if (decision) {
        this.events.forEach(ev => {
          if (ev.title === name) {
            ev.start = date;
            ev.end = date;
          }
        });
        this.refresh.next();
        this.persistEvents();
      }
    });
  }

  /**
   * opens the modal when user tries to insert the curriculum
   * @param name of the curriculum
   * @param date the date curriculum got dropped on
   *
   * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  openEventInsertCurriculum(name: string, date: Date): Observable<any> {
    const dialogRef = this.dialog.open(StartMondayModalComponent, {
      width: '600px',
      data: {
        curriculumName: name,
        startDate: date
      }
    });

    return dialogRef.afterClosed();
  }

  /**
   * Whenever an event happens on the calendar (click, drag, drop, edit, delete), this method is called
   * with the actions of the event and the event itself.
   * Becaused the pencil icon does not render correctly, we removed it and do not have any functionality
   * for the action.
   * @param action The action that took place (drag, drop, edit, delete, click)
   * @param event The event that the action happened on
   *
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Clicked') {
      this.openDialog(event);
    } else if (action === 'Edited') {
    } else if (action === 'Deleted') {
    } else {
      const id: number = +event.id;
      /**
       * checks if the date is the same, current way of preventing the modal from popping when moving a day event
       * in the future a CustomCalendarEvent class could be a solution to this problem,
       * providing a way to check if something is a curriculum being dragged or not
       */
      if (event.start.getDate() !== event.end.getDate() || event.start.getMonth() !== event.end.getMonth()) {
        this.populateCalendar(id, event);
      }
      this.refresh.next();
    }
  }

  /**
   * Algorithm that handles where subtopics go on the calendar when first dropped,
   *
   * @param id id for the object that will be dropped into the calendar
   * @param event that is dragged and dropped
   * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  populateCalendar(id: number, event: CalendarEvent): void {
    console.log(event);
    this.calendarService.getCurriculumById(id).subscribe(curr => {
      this.openEventInsertCurriculum(curr.name, event.start).subscribe(decision => {
        if (decision !== null) {
          event.start = decision;
          this.selectedCurriculum = curr;
          this.dropEvent = event;
        }
      });
    });
  }

  /**
   * Used to populate the add persisted events from the ngOnInit database call to the events list
   * that is used to hold calendar events, then refreshes the calendar. This is called by the ngDoCheck
   * lifecycle hook so that it is only called once the response from the ngOnInit call is complete.
   */
  generateStoredEvents() {
    for (let i = 0; i < this.storedEvents.length; i++) {
      this.events.push(
        {
          start: new Date(this.storedEvents[i].startDateTime),
          end: new Date(this.storedEvents[i].endDateTime),
          title: this.storedEvents[i].title,
          id: this.storedEvents[i].id,
        });
    }
    this.refresh.next();
  }
  /**
   * method that takes the topics and subtopics and generated calendar events from them when dropped onto the calendar
   * called when curriculum is dropped onto the calendar
   *
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  generateEvents() {
    // this.subTopicsReceived = false;
    // for (let j = 0; j < this.topicArr.length; j++) {
    //   const subtopicTime = (this.topicLength * 5 * 7) / this.subtopicArrArr[j].length;
    //   this.currTopicTime = subtopicTime;

    //   for (let i = 0; i < this.subtopicArrArr[j].length; i++) {
    //     if (isWeekend(addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay))) {
    //       topicDay++;
    //       if (isWeekend(addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay))) {
    //         topicDay++;
    //       }
    //     }
    //     if (this.hour + this.currTopicTime > 7 && !this.multiDayEventCreated) {
    //       this.multidaySubtopic(this.subtopicArrArr[j][i], topicDay, (7 - this.hour), this.dropEvent, this.selectedCurriculum);
    //       topicDay++;
    //       i--;
    //     } else {
    //       this.events.push(
    //         {
    //           start: addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour), topicDay),
    //           end: addDays(addHours(startOfDay(this.dropEvent.start), 9 + this.hour + this.currTopicTime), topicDay),
    //           title: this.subtopicArrArr[j][i].name,
    //           id: this.subtopicArrArr[j][i].id,
    //           color: colors.newColor,
    //           actions: this.actions,
    //           resizable: {
    //             beforeStart: true,
    //             afterEnd: true
    //           },
    //           draggable: true,
    //         }
    //       );
    //       this.colorNum++;
    //       this.hour += this.currTopicTime;
    //       this.currTopicTime = subtopicTime;
    //       this.multiDayEventCreated = false;
    //     }
    //   }
    // }
    console.log('generate Events');
    console.log(this.selectedCurriculum);
    const numWeeks: number = this.selectedCurriculum.numberOfWeeks;
    const weeks: CurriculumWeek[] = this.selectedCurriculum.curriculumWeeks;
    this.selectedCurriculum = null;
    for ( const week of weeks) {
      console.log('week: ' + week.curriculumWeekId);
      for ( const day of week.curriculumDays ) {
        console.log('day: ' + day.dayNum);
        for ( const subtopic of day.supTopics ) {
          console.log(subtopic);
        }
      }
    }
    // this.persistCurriculum(this.selectedCurriculum);
    this.persistEvents();
  }

  /**
   * Used for subtopics that span multiple days.
   * If there is not enought time in the current day to complete a subtopic, this method is used
   * to split the subtopic and make multiple events from it.
   * @param subtopic subTopic to be added to calendar
   * @param topicDay the current day that the subtopic is on
   * @param timeLeft time left in a day (hours until 4pm)
   * @param event the event to be pushed to calendar
   * @param curr curr is the curriculum to be pushed
   */
  multidaySubtopic(subtopic: SubTopic, topicDay: number, timeLeft: number, event: CalendarEvent, curr: Curriculum) {
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
      }
    );
    this.currTopicTime = this.currTopicTime - timeLeft;
    this.hour = 0;
    this.multiDayEventCreated = true;
  }
  /**
   * persists all events in the event array.
   */
  persistEvents() {
    const eventsToPersist: cal_event.CalendarEvent[] = [];
    for (let i = 0; i < this.events.length; i++) {
      eventsToPersist.push({
        title: this.events[i].title,
        description: this.events[i].title,
        statusId: 0,
        startDateTime: this.events[i].start,
        endDateTime: this.events[i].end,
        calendarSubtopicId: +this.events[i].id,
      });

    }
    this.calendarService.addCalendarEventList(eventsToPersist).subscribe(eventRes => {
    });
  }
  /**
   * Custom event to be persisted.
   * @param event an event to be persisted
   */
  persistEvent(event: CalendarEvent) {
    const calEvent: cal_event.CalendarEvent = {
      title: event.title,
      description: event.title,
      statusId: 0,
      startDateTime: event.start,
      endDateTime: event.end,
      calendarSubtopicId: +event.id,
    };
    this.calendarService.addCalendarEvent(calEvent).subscribe(eventRes => {
    },
      err => {
      });
  }
  /**
   * Persists a curriculum.
   * @param curriculum a curriculum object to be persisted.
   */
  persistCurriculum(curriculum: Curriculum) {
    let batchId = 0;
    this.batchService.getBatchesByTrainerId(this.user.id).subscribe(batches => {
      if (batches === []) {
        batchId = batches[0].id;
      }
    });
    const calCurriculum: CalendarCurriculum = {
      curriculumId: curriculum.id,
      batchId: batchId
    };
    this.calendarService.addCalendarCirriculum(calCurriculum).subscribe(curr => {
    });
  }

  /**
   * creates an event for the calander persisting the event and reloading the calendar.
   */
  addEvent(): void {
    if (!this.eventExists(this.newSubtopicName)) {
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
      this.persistEvents();
    } else {
      this.openEventDuplicateDialog(this.newSubtopicName, this.newSubtopicDate);
    }
  }
  /**
   * check if event exists in the events array
   *
   * @param title of the new event
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  eventExists(title): boolean {
    for (const calEvent of this.events) {
      if (title === calEvent.title) {
        return true;
      }
    }
    return false;
  }
}

/**
 * @author Kyle Smith | Aaron Mathews | Brandon Scoggins | 1806-Jun18-USF-Java | Wezley Singleton
 */
