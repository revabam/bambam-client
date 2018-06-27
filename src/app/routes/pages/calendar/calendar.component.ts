import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  private topics = ['Java', 'SQL', 'Angular', 'JavaScript', 'Spring', 'DevOps',
  'SOAP', 'REST', 'Microservices', 'Docker', 'Amazon Web Services'];

  private subtopics = [];

  private view = 'month';
  private viewDate = new Date();
  private activeDayIsOpen  = false;
  private datePickerIsOpen = false;

  constructor() { }

  ngOnInit() {
    this.configureMainCalendar();
  }

  /**
   * Configures the main calendar initially.
   */
  private configureMainCalendar() {
    $('#main-calendar').fullCalendar({
      // put your options and callbacks here
    });
  }


  /**
   * Toggle button to open or close flatpickr calendar.
   * Used for 'Jump to particular date' mini calendar.
   */
  private toggleDatePicker() {
    // const statusOpen = document.getElementById('datePicker').classList.contains('active');
    // console.log(statusOpen);
    if (this.datePickerIsOpen) {
      // this.datePicker.close();
    } else {
      // this.datePicker.open();
    }
    this.datePickerIsOpen = !this.datePickerIsOpen;
  }

  /**
   * Changes the calendar view. Available views: day, week, month
   * @param value Type of view
   */
  private changeView(value: string) {
    if (value === 'day' || value === 'week' || value === 'month') {
      this.view = value;
    }
  }

  /**
   * Returns true if date passed is today's date.
   * @param date Date object
   */
  private isCurrentDate(date: Date): boolean {
    const today = new Date();
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
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
  private validSubtopic() {
    const subtopic = (<HTMLInputElement>document.getElementById('subtopic')).value;
    for (let i = 0; i < this.subtopics.length; i++) {
      if (subtopic.toLowerCase() === this.subtopics[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }

}
