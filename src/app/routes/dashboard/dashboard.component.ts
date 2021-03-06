import { Batch } from './../../models/batch';
import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../models/bam-user';
import { Router } from '@angular/router';
import { BatchService } from '../../services/batch.service';
import { Curriculum } from '../../models/curriculum';
import { CurriculumService } from '../../services/curriculum.service';
import { UserService } from '../../services/user.service';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEvent } from '../../models/calendar-event';
import { CurriculumWeek } from '../../models/curriculum-week';
import { CurriculumDay } from '../../models/curriculum-day';
import { CognitoService } from '../../services/cognito.service';

/**
* This component is the dashboard page. It is the page that the
* user is directed to after they login. It displays personal
* information and batch information to the user.
* @author Bradley Walker | Khaleel Williams | 1806-Jun18-USF-Java | Wezley Singleton
* @author Joey Shannon | Drake Mapel | Marcin Salamon | 1806-Spark | Steven Kelsey
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  headerColumns: string[] = ['time', 'flagged', 'sub', 'control'];
  dataSource;
  dayInfo;
  Today = new Date().setDate(new Date().getDate() + 1);
  Tomorrow = new Date().setDate(new Date().getDate() + 2);
  daySelected = new Date().setDate(new Date().getDate() + 1);
  calendarEvents = null;
  selectedDate = this.cs.getCurriculumByWeek(1);
  currentBatch: Batch;
  user: BamUser;
  batch;
  batchWeek: number;
  percentCompletion: number;
  editing = false;
  firstName: string;
  lastName: string;
  visibilityIcon = [
    { num: 0, icon: 'visibility_off' },
    { num: 1, icon: 'visibility' }
  ];
  DashTitle = 'Today';
  todayIsOpen = true;
  topicsIsOpen: boolean;
  list: string[];
  eventsThisWeek: CalendarEvent[];
  curriculumDay: CurriculumDay[];
  curriculumWeek: CurriculumWeek;
  selectedDay;
  currentWeekEvents: CalendarEvent[];
  dayArr = [
    {
      dayNum: 0,
      today: 'SUN',
      selected: false
    },
    {
      dayNum: 1,
      today: 'MON',
      selected: false
    },
    {
      dayNum: 2,
      today: 'TUE',
      selected: false
    },
    {
      dayNum: 3,
      today: 'WED',
      selected: false
    },
    {
      dayNum: 4,
      today: 'THU',
      selected: false
    },
    {
      dayNum: 5,
      today: 'FRI',
      selected: false
    },
    {
      dayNum: 6,
      today: 'SAT',
      selected: false
    },
    {
      dayNum: 7,
      today: 'SUN',
      selected: false
    }
  ];

  constructor(
    private router: Router,
    private batchService: BatchService,
    private userService: UserService,
    private calendarService: CalendarService,
    private cs: CurriculumService,
    private cognito: CognitoService
  ) { }

  /**
  * This method runs when the component is initialized. It will get the user
  * data from the session storage and display both the user's personal info,
  * and info about the batch they are associated with.
  * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
  */
  sortData() {
    return this.curriculumDay.sort((a, b) => {
      return <any>(b.dayNum) - <any>(a.dayNum);
    });
  }

  /**
   * checks for logged in user and confirms with cognito. stores data from batches related to the user.
   * Grabs calander events that belong to the user and loads them into calendarEvents.
   * currentWeekEvents are filtered by getCurrentWeekEvents().
   * this.showCurrentDay snaps user to current day events. This might not work on saturday.
   * getBatchByTrainer gets current batch, getCurriculumByWeek gets current week and filters it by day order (M-F)
   * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
   */
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
    } else {
      this.cognito.bamUser = JSON.parse(sessionStorage.getItem('user'));
    }
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.calendarService.getCalendarEventsByTrainerId(1).subscribe(response => {
      this.calendarEvents = response;
      this.currentWeekEvents = this.getCurrentWeekEvents(this.calendarEvents);
      this.showCurrentDay();
    });
    this.batchService.getBatchByTrainer(1).subscribe(
      (result: Batch[]) => {
        this.currentBatch = result[0];
      }
    );
    this.cs.getCurriculumByWeek(1).subscribe((values: CurriculumWeek) => {
      this.curriculumWeek = values;
      this.curriculumDay = values.curriculumDays;
      this.curriculumDay = this.curriculumDay.sort((n1, n2) => {
        if (n1.dayNum > n2.dayNum) {
          return 1;
        }
        if (n1.dayNum < n2.dayNum) {
          return -1;
        }
        return 0;
      });
    });
  }

  /**
  * These method(s) associated with the ngOnInit()
  * Iterates the array, sets all as unselected.
  * Finally, sets the selected control class = active.
  * the users parameters
  * @param dayNum
  * @return boolean false associated with selected.
  * @author Marcin Salamon, Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  selectDay(dayNum: number) {
    for (const day of this.dayArr) {
      day.selected = false;
    }
    this.dayArr[dayNum].selected = true;
  }

  /**
  * These method(s) associated with the ngOnInit()
  * Gets the current events of the day based on
  * the selected day
  * @param dayNumber
  * @return number
  * @author Marcin Salamon, Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  getCurrentDayEvents(dayNumber) {
    let counter = 0;
    for (const event of this.currentWeekEvents) {
      if (new Date(event.startDateTime).getDay() === dayNumber) {
        counter++;
      }
    }
    return counter;
  }

  /**
  * These method(s) is associated with the ngOnInit()
  * Gets the current events of the week by setting
  * the users parameters
  * @param CalendarEvent
  * @return an array of this users events.
  * @author Marcin Salamon, Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  getCurrentWeekEvents(events: CalendarEvent[]): CalendarEvent[] {
    const currentWeekEvents: CalendarEvent[] = [];
    const week: Date[] = [];
    const monday = new Date();
    while (monday.getDay() > 1 && monday.getDay() !== 0) {
      if (monday.getDay() === 0) {
        monday.setDate(monday.getDate() + 1);
      } else {
        monday.setDate(monday.getDate() - 1);
      }
    }
    for (let i = 0; i < 5; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }
    for (const event of events) {
      for (const day of week) {
        const eventDate: Date = new Date(event.startDateTime);
        if (eventDate.getDate() === day.getDate() && eventDate.getMonth() === day.getMonth()) {
          currentWeekEvents.push(event);
        }
      }
    }
    return currentWeekEvents;
  }

  /**
  * Method associated with the week at a glance bar
  * Clears the dataSource of old data, pushes
  * associated day values into the new array.
  * @param dayNumber
  * @return an array of this users events.
  * @author Marcin Salamon, Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  showDay(dayNumber) {
    this.selectDay(dayNumber);
    this.dataSource = [];
    for (const event of this.currentWeekEvents) {
      if (new Date(event.startDateTime).getDay() === dayNumber) {
        this.dataSource.push(event);
      }
    }
  }

  /**
  * These method(s) associated with the view today button.
  * Gets the current events of the day by setting
  * the users day to the client's current day.
  * @param CalendarEvent
  * @return number.
  * @author Marcin Salamon, Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  showCurrentDay() {
    this.showDay(new Date().getDay());
    this.DashTitle = 'Today';
  }

  /**
  * These method(s) associated with row controllers
  * Gets the current events of the week by setting
  * the users parameters
  * NOTE: Currently unpersisted, future usecase!
  * @param yesNoToggle to change the indicator.
  * @param sub to locate the row.
  * @return 1 for complete, 0 for incomplete.
  * @author Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  statusToggle(sub, yesNoToggle) {
    sub.statusId = yesNoToggle;
  }

  /**
  * These method(s) associated with row controllers
  * Gets the current events of the week by setting
  * the users parameters
  * NOTE: Currently unpersisted, future usecase!
  * @param sub to locate the row.
  * @return 1 for flagged, 0 for unflagged.
  * @author Joseph Shannon | Spark1806-USF-Java | Steven Kelsey
  */
  flagRow(sub) {
    if (!sub.flaggedId) {
      sub.flaggedId = 1;
    } else {
      sub.flaggedId = 0;
    }
  }

  /**
  * These method(s) associated with row controllers
  * This method is used t sort throught a list of batches. Batches
  * are sorted by their start dates.
  * @param a batch
  * @param b batch to be compared against
  * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
  */
  compareBatches(a: Batch, b: Batch) {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }
    return 0;
  }

  /**
   * This method is used to calculate the number of weeks between
   * two dates.
   * @param date1 Start date
   * @param date2 End date
   * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
   */
  calculateWeeksBetween(date1: Date, date2: Date) {
    // The number of milliseconds in one week
    const ONE_WEEK = 604800000;
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date1_ms - date2_ms);
    // Convert back to weeks and return hole weeks
    return Math.floor(difference_ms / ONE_WEEK);
  }

  /**
   * This method toggles editing mode on the personal information
   * card.
   * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
   */
  toggleEdit() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.editing = true;
  }

  /**
   * This method is called if the user cancels out of editing mode
   * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
   */
  cancelEdit() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.editing = false;
  }

  /**
   * This method is called if the user saves the changes made in editing mode.
   * It updates the user's info in the database and in session storage.
   * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
   */
  saveChanges() {
    this.userService.updateInfo(this.user).subscribe(
      result => {
        sessionStorage.setItem('user', JSON.stringify(this.user));
      }
    );
    this.editing = false;
  }
}
