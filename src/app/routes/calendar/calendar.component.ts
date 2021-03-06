import { CognitoService } from './../../services/cognito.service';
import { CurriculumService } from './../../services/curriculum.service';
import { Batch } from './../../models/batch';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, DoCheck, Inject } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addWeeks, isWeekend } from 'date-fns';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as CalEvent from '../../models/calendar-event';
import { BamUser } from '../../models/bam-user';
import { BatchService } from '../../services/batch.service';
import { EventColor, EventAction } from 'calendar-utils';
import { EventDuplicateModalComponent } from './event-duplicate-modal/event-duplicate-modal.component';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { Curriculum } from '../../models/curriculum';
import { TopicService } from '../../services/topic.service';
import { CalendarService } from '../../services/calendar.service';
import { SubTopicService } from '../../services/subtopic.service';
import { StartMondayModalComponent } from './start-monday-modal/start-monday-modal.component';
import { CurriculumWeek } from '../../models/curriculum-week';
import { Router } from '@angular/router';


/**
 * class used to populate the calendar, implements the interface provided in the Angular Material Calendar
 * adds extra fields
 * statusId is numerical, correlates planned, completed, cancelled, missed
 * subTopicId is the id of the subTopic used for viewing details
 * flagged is used in dashboard to mark important events, numerical for different tiers
 * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
 * @author Kyle Smith | Aaron Mathews | Brandon Scoggins | 1806-Jun18-USF-Java | Wezley Singleton
 */
export class CustomCalendarEvent implements CalendarEvent<any> {
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
  version: number;
  color?: EventColor;
  actions?: EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  description?: string;
  statusId: number;
  subTopicId?: number;
  flagged?: number;
}
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.scss']
})
export class CalendarComponent implements OnInit, DoCheck {
  colors: any = {
    blue: {
      primary: 'blue',
      secondary: 'lightblue'
    },
    red: {
      primary: '#e23434',
      secondary: '#e23434'
    },
    green: {
      primary: 'green',
      secondary: 'green'
    },
    yellow: {
      primary: 'yellow',
      secondary: 'yellow'
    }
  };
  user: BamUser;
  showSideNav = true;

  startHour = 8;
  endHour = 18;
  hour = 0;
  subTopicsReceived = false;
  multiDayEventCreated = false;
  selectedCurriculum: Curriculum;
  colorNum = 0;

  docheck = true;
  /**
   * because the schema is named the same as the interface the material calendar takes in to create events
   */
  storedEvents: CalEvent.CalendarEvent[] = null;

  newSubtopicName: string;
  newSubtopicDate: Date;

  initialRender = false;

  newColor: string;

  activeDayIsOpen = false;
  dropEvent: CustomCalendarEvent;
  curriculums: Curriculum[];
  currTopicTime: number;

  curriculumEvents: CustomCalendarEvent[] = null;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CustomCalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-check"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Status', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CustomCalendarEvent[] = [];

  constructor(private modal: NgbModal, private calendarService: CalendarService, private subtopicService: SubTopicService,
    private topicService: TopicService, private dialog: MatDialog, private batchService: BatchService,
    private curriculumService: CurriculumService, private router: Router, private cognito: CognitoService) { }

  /**
   * Life hook for loading all calendar services
   */
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
    } else {
      this.cognito.bamUser = JSON.parse(sessionStorage.getItem('user'));
    }
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user.id = '1';
    this.calendarService.getCalendarEvents(this.user.id).subscribe(events => {
      this.storedEvents = events;
      this.calendarService.getCustomCalendarEvents().subscribe(customEvents => {
        for (const cEv of customEvents) {
          if (cEv.trainerId !== this.user.id) {
            this.storedEvents.push(cEv);
          }
        }
        this.initialRender = true;
      });
    });

    this.curriculumService.getAll().subscribe(response => {
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
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
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
          version: curriculum.version,
          color: this.colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          statusId: 1
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
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
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
   * information about the event (event name, description, time, etc.).
   * @param event The event that was clicked
   * @author Alicia Douglas | Spark1806-USF-Java | Steven Kelsey
   */
  openDialog(event: CustomCalendarEvent): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
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
          description: event.description,
          startTime: event.start,
          endTime: event.end,
          statusId: event.statusId
        }
      }
    );
    dialogRef.afterClosed().subscribe(decision => {
      this.moveEvents(decision, event);
    });
  }

  /**
   * displays the modal for creating a duplicate event
   * @param name of the duplicate event
   * @param date of the duplicate event
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  openEventDuplicateDialog(name: string, date: Date) {
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
   * function takes in a direction in which to move events and then based on that moves them back or forth a day
   * if the new day falls on a Saturday or Sunday, it gets moved to next week instead
   * does not currently change start time
   * @param decision numerical decision whether to push future events back or forward a day
   * @param event event from which to start moving other events
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  moveEvents(decision: number, event: CalendarEvent) {
    if (decision !== 0 && decision !== undefined) {
      this.activeDayIsOpen = false;
      const eventStartDate = new Date(event.start);
      for (const ev of this.events) {
        if (ev.start >= eventStartDate) {
          ev.start.setDate(ev.start.getDate() + decision);
          ev.end.setDate(ev.end.getDate() + decision);
          /**
           * check if the new day falls on Saturday or Sunday
           */
          if (ev.start.getDay() === 6 || ev.start.getDay() === 0) {
            ev.start.setDate(ev.start.getDate() + (2 * decision));
            ev.end.setDate(ev.end.getDate() + (2 * decision));
          }
        }
      }
    }
    this.persistEvents();
  }

  /**
   * Whenever an event happens on the calendar (click, drag, drop, edit, delete), this method is called
   * with the actions of the event and the event itself.
   * Becaused the pencil icon does not render correctly, we removed it and do not have any functionality
   * for the action.
   * @param action The action that took place (drag, drop, edit, delete, click)
   * @param event The event that the action happened on
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  handleEvent(action: string, event: CalendarEvent): void {
    if (action === 'Clicked') {
      this.openDialog(<CustomCalendarEvent>event);
    } else if (action === 'Edited') {
    } else if (action === 'Deleted') {
    } else if (action === 'Status') {
      this.changeStatus(event);
    } else {
      const id: number = +event.id;
      /**
       * checks if the date is the same, current way of preventing the modal from popping when moving a day event
       * in the future a CustomCalendarEvent class could be a solution to this problem,
       * providing a way to check if something is a curriculum being dragged or not
       */
      if (event.start.getDate() !== event.end.getDate() || event.start.getMonth() !== event.end.getMonth()) {
        this.populateCalendar(event);
      }
      this.persistEvents();
      this.refresh.next();
    }
  }

  /**
   * changes status in sequence:
   * 1 - planned - blue
   * 2 - completed - green
   * 3 - cancelled - red
   * 4 - missed - yellow
   * when event is in the past, it can't go into planned status
   * @param event event to change status on
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  changeStatus(event: CalendarEvent) {
    const custEvent = <CustomCalendarEvent>event;
    custEvent.statusId++;
    if (custEvent.statusId === 5) {
      custEvent.statusId = 1;
    }
    switch (custEvent.statusId) {
      case 1:
        custEvent.color = this.colors.blue;
        if (event.start < new Date()) {
          custEvent.statusId = 2;
          custEvent.color = this.colors.green;
        }
        break;
      case 2:
        custEvent.color = this.colors.green;
        break;
      case 3:
        custEvent.color = this.colors.red;
        break;
      case 4:
        custEvent.color = this.colors.yellow;
        break;
      default:
        break;
    }
    this.persistEvents();
  }

  /**
   * Algorithm that handles where subtopics go on the calendar when first dropped,
   * @param id id for the object that will be dropped into the calendar
   * @param event that is dragged and dropped
   * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  populateCalendar(event: CalendarEvent): void {
    for (const curr of this.curriculums) {
      if (curr.id === event.id) {
        this.openEventInsertCurriculum(curr.name, event.start).subscribe(decision => {
          if (decision !== null) {
            event.start = decision;
            decision = null;
            this.selectedCurriculum = curr;
            this.dropEvent = <CustomCalendarEvent>event;
          }
        });
      }
    }
  }

  /**
   * Used to populate the add persisted events from the ngOnInit database call to the events list
   * that is used to hold calendar events, then refreshes the calendar. This is called by the ngDoCheck
   * lifecycle hook so that it is only called once the response from the ngOnInit call is complete.
   */
  generateStoredEvents() {
    for (const event of this.storedEvents) {
      const startTimeDate = new Date(event.startDateTime);
      const endTimeDate = new Date(event.endDateTime);
      if (startTimeDate.getHours() < 8) {
        this.startHour = startTimeDate.getHours();
      }
      if (endTimeDate.getHours() > 18) {
        this.endHour = endTimeDate.getHours();
      }
      let color;
      switch (event.statusId) {
        case 1:
          color = this.colors.blue;
          break;
        case 2:
          color = this.colors.green;
          break;
        case 3:
          color = this.colors.red;
          break;
        case 4:
          color = this.colors.yellow;
          break;
        default:
          break;
      }
      this.events.push(
        {
          id: event.id,
          start: new Date(event.startDateTime),
          end: new Date(event.endDateTime),
          title: event.title,
          description: event.description,
          version: event.version,
          color: color,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          subTopicId: event.subTopicId,
          statusId: event.statusId,
          flagged: event.flagged
        });
    }
    this.refresh.next();
  }

  /**
   * method that creates calendar events when dropped curriculum is dropped onto the calendar
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  generateEvents() {
    this.subtopicService.getAll().subscribe((subTopics) => {
      this.subtopicService.subtopics = subTopics;
      this.selectedCurriculum = this.subtopicService.setDayTopicNames(this.selectedCurriculum);
      const startDate: Date = this.dropEvent.start;
      const subtopicStartTime = startDate;
      const weeks: CurriculumWeek[] = this.selectedCurriculum.curriculumWeeks;
      for (const week of weeks) {
        for (const day of week.curriculumDays) {
          let hour = 9;
          const subTopicsToday = day.daySubTopics.length;
          const timeDifference = (7 / subTopicsToday);
          /**
           * if statement that skips weekends
           */
          if (subtopicStartTime.getDay() === 6) {
            subtopicStartTime.setDate(subtopicStartTime.getDate() + 2);
          } else if (subtopicStartTime.getDay() === 0) {
            subtopicStartTime.setDate(subtopicStartTime.getDate() + 1);
          }
          for (const subtopic of day.daySubTopics) {
            if (hour > 12 && hour < 13) {
              hour++;
            }
            /**
             * sets start time of the subtopic
             */
            subtopicStartTime.setHours(Math.floor(hour));
            subtopicStartTime.setMinutes((hour - Math.floor(hour)) * 60);
            hour = hour + timeDifference;
            const endTime = new Date(subtopicStartTime);
            /**
             * sets end time of the event based on how many subtopics are there that day
             */
            endTime.setHours(Math.floor(hour));
            endTime.setMinutes((hour - Math.floor(hour)) * 60);
            this.events.push({
              start: new Date(subtopicStartTime),
              end: new Date(endTime),
              title: subtopic.name,
              version: this.selectedCurriculum.version,
              color: this.colors.blue,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              draggable: false,
              subTopicId: subtopic.id,
              statusId: 1,
              flagged: 0
            });
          }
          subtopicStartTime.setDate(subtopicStartTime.getDate() + 1);
        }
      }
      this.selectedCurriculum = null;
      this.docheck = true;
      this.persistEvents();
    });
  }

  /**
   * persists all events in the event array.
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  persistEvents() {
    const eventsToPersist: CalEvent.CalendarEvent[] = [];
    for (const event of this.events) {

      const ev: CalEvent.CalendarEvent = {
        id: +event.id,
        title: event.title,
        description: event.title,
        statusId: event.statusId,
        startDateTime: event.start,
        endDateTime: event.end,
        subTopicId: event.subTopicId,
        trainerId: this.user.id,
        flagged: event.flagged
      };
      eventsToPersist.push(ev);
    }
    this.calendarService.addCalendarEvents(eventsToPersist).subscribe(eventRes => {
      for (let i = 0; i < this.events.length; i++) {
        this.events[i].id = eventRes[i].id;
        this.events[i].draggable = true;
      }
    });
  }

  /**
   * Custom event to be persisted.
   * @param event an event to be persisted
   */
  persistEvent(event: CustomCalendarEvent) {

    const calEvent: CalEvent.CalendarEvent = {
      title: event.title,
      description: event.title,
      statusId: event.statusId,
      startDateTime: event.start,
      endDateTime: event.end,
      subTopicId: +event.id,
      trainerId: this.user.id,
      flagged: event.flagged
    };
    this.calendarService.addCalendarEvent(calEvent).subscribe(eventRes => {
    },
      err => {
      });
  }

  /**
   * creates an event for the calander persisting the event and reloading the calendar.
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  addEvent(): void {
    if (!this.eventExists(this.newSubtopicName)) {
      this.events.push({
        title: this.newSubtopicName,
        start: addHours(this.newSubtopicDate, 9),
        end: addHours(this.newSubtopicDate, 10),
        color: this.colors.red,
        draggable: true,
        actions: this.actions,
        version: 1,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        statusId: 3,
        flagged: 0,
        subTopicId: -1
      });
      this.refresh.next();
      this.persistEvents();
    } else {
      this.openEventDuplicateDialog(this.newSubtopicName, this.newSubtopicDate);
    }
  }

  /**
   * check if event exists in the events array
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
