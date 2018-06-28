import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private topics = ['Java', 'SQL', 'Angular', 'JavaScript', 'Spring', 'DevOps',
  'SOAP', 'REST', 'Microservices', 'Docker', 'Amazon Web Services'];

  private subtopics = [];

  private validSubtopic = false;
  private isToday = true;

  // Used for updating the view
  private view: string; // $('#main-calendar').fullCalendar('getView').type;
  private viewDate: moment.Moment; // $('#main-calendar').fullCalendar('getDate');
  private title: string; // $('#main-calendar').fullCalendar('getView').title;

  // Used for datepicker and timepicker
  @ViewChild('datepicker') private bsValue: ElementRef;
  private time: Date;

  private events = [
    {
      title: 'Test1',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.blue
    },
    {
      title: 'Test2',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.green
    },
    {
      title: 'Test3',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.red
    },
    {
      title: 'Test4',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.orange
    },
    {
      title: 'Test5',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.blue
    },
    {
      title: 'Test6',
      start: new Date(),
      description: 'This is a cool event',
      textColor: 'white',
      color: eventColor.blue
    }
  ];

  constructor() { }

  ngOnInit() {
    this.configureMainCalendar();
    this.configureMiniCalendarAndTime();
  }

  /**
   * Returns true if window screen is smaller than 768px.
   */
  private smallScreen(): boolean {
    if (window.innerWidth < 768) {
      return true;
    }
    return false;
  }

  /**
   * Configures the main calendar initially.
   */
  private configureMainCalendar() {
    $('#main-calendar').fullCalendar({
      header: false,
      events: this.events,
      eventLimit: true,
      dayRender: function( date, cell ) {
        // Change background color of today's day
        if (date.format('MM-DD-Y') === moment(new Date()).format('MM-DD-Y')) {
          cell.css('background-color', 'rgb(255, 134, 73)');
        }
      }
    });

    this.title = $('#main-calendar').fullCalendar('getView').title;
    this.viewDate = $('#main-calendar').fullCalendar('getDate');
    this.view = $('#main-calendar').fullCalendar('getView').type;
  }

  private configureMiniCalendarAndTime() {
    this.time = this.viewDate.toDate();
    this.time.setHours(8);
    this.time.setMinutes(0);
  }

  /**
   * Changes the calendar view. Available views: day, week, month, list.
   * Also changes view based on: today, prev, next
   * @param value Type of view
   */
  private changeView(view: string) {
    switch (view) {
      case 'day':
        $('#main-calendar').fullCalendar('changeView', 'agendaDay');
        this.view = 'day';
        break;

      case 'week':
        $('#main-calendar').fullCalendar('changeView', 'agendaWeek');
        this.view = 'week';
        break;

      case 'month':
        $('#main-calendar').fullCalendar('changeView', 'month');
        this.view = 'month';
        break;

      case 'list':
        $('#main-calendar').fullCalendar('changeView', 'list');
        this.view = 'list';
        break;

      case 'today':
        $('#main-calendar').fullCalendar('today');
        break;

      case 'prev':
        $('#main-calendar').fullCalendar('prev');
        break;

      case 'next':
        $('#main-calendar').fullCalendar('next');
        break;
    }

    // Set current title and viewDate to reflect changes
    this.title = $('#main-calendar').fullCalendar('getView').title;
    this.viewDate = $('#main-calendar').fullCalendar('getDate');

    // Disable or enable Today button
    if (this.checkToday(this.viewDate)) {
      this.isToday = true;
    } else {
      this.isToday = false;
    }
  }

  private onChangeDatepicker(event) {
    const date = moment(event);
    $('#main-calendar').fullCalendar('gotoDate', date);
    this.changeView('day');
  }

  /**
   * Returns true if date passed is today's date.
   * @param date Date of type Moment
   */
  private checkToday(date: moment.Moment): boolean {
    const today = moment(new Date());
    if (date.format('MM-DD-Y') === today.format('MM-DD-Y')) {
      return true;
    }
    return false;
  }

  /**
   * Show or hide the events panel.
   * Modifies some CSS and bootstrap elements of the events panel.
   */
  private clickEventOptions() {
    const events = document.getElementById('event-panel');
    const calendar = document.getElementById('calendar-panel');
    if (events.style.display !== 'block') {
      events.style.display = 'block';
      events.scrollIntoView();
      calendar.classList.remove('col-md-12');
    } else {
      events.style.display = 'none';
      calendar.classList.add('col-md-12');
    }
  }

  /**
   * Add list of subtopics if a topic is valid.
   */
  private getSubtopics() {
    const topic = (<HTMLInputElement>document.getElementById('topic')).value;
    this.subtopics = [];

    if (topic.toLowerCase() === 'java'.toLowerCase()) {
      this.subtopics.push('Threads');
      this.subtopics.push('Inheritance');
      this.subtopics.push('Collections');
      this.subtopics.push('Maps');
      (<HTMLInputElement>document.getElementById('subtopic')).disabled = false;
    } else {
      (<HTMLInputElement>document.getElementById('subtopic')).disabled = true;
    }
  }

  /**
   * Returns true or false if subtopic exists within a topic.
   */
  private checkSubtopic() {
    const subtopic = (<HTMLInputElement>document.getElementById('subtopic')).value;
    for (let i = 0; i < this.subtopics.length; i++) {
      if (subtopic.toLowerCase() === this.subtopics[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }

}

const eventColor = {
  red: '#ff0000',
  green: '#00bb5d',
  blue: '#2399e5',
  orange: '#fd7850'
};
