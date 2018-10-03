import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../models/bam-user';
import { Router } from '@angular/router';
import { Batch } from '../../models/batch';
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
 *
 * @author Bradley Walker | Khaleel Williams | 1806-Jun18-USF-Java | Wezley Singleton
 * @author Joey Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
  currentBatch;

  user: BamUser = {
    id: null,
    firstName: '',
    lastName: '',
    email: ''
  };

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
  todayIsOpen: boolean;
  topicsIsOpen: boolean;
  list: string[];
  eventsThisWeek: CalendarEvent[];
  curriculumDay: CurriculumDay[];
  curriculumWeek: CurriculumWeek[];
  selectedDay;
  currentWeekEvents: CalendarEvent[];

  dayArr = [
    {
      dayNum: 0,
      today: 'Sunday',
      selected: false
    },
    {
      dayNum: 1,
      today: 'Monday',
      selected: false
    },
    {
      dayNum: 2,
      today: 'Tuesday',
      selected: false
    },
    {
      dayNum: 3,
      today: 'Wednesday',
      selected: false
    },
    {
      dayNum: 4,
      today: 'Thursday',
      selected: false
    },
    {
      dayNum: 5,
      today: 'Friday',
      selected: false
    },
    {
      dayNum: 6,
      today: 'Saturday',
      selected: false
    },
    {
      dayNum: 7,
      today: 'Sunday',
      selected: false
    }
  ];

  subsArr = [
    {
      'nameId': 1,
      'topicName': 'For Loops',
      'topicId': 1
    },
    {
      'nameId': 2,
      'topicName': 'While Loops',
      'topicId': 2
    },
    {
      'nameId': 3,
      'topicName': 'Do While',
      'topicId': 3
    },
    {
      'nameId': 4,
      'topicName': 'If statments',
      'topicId': 4
    },
    {
      'nameId': 5,
      'topicName': 'Normalization',
      'topicId': 2
    },
    {
      'nameId': 6,
      'topicName': 'Stored Procedures',
      'topicId': 2
    },
    {
      'nameId': 7,
      'topicName': 'HTML elements',
      'topicId': 3
    },
    {
      'nameId': 8,
      'topicName': 'JavaScript DOM manipulation',
      'topicId': 3
    },
    {
      'nameId': 9,
      'topicName': 'Inline, internal, and external CSS',
      'topicId': 3
    },
    {
      'nameId': 10,
      'topicName': 'Node',
      'topicId': 4
    },
    {
      'nameId': 11,
      'topicName': 'Express APIs',
      'topicId': 4
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
  */

  sortData() {
    return this.curriculumDay.sort((a, b) => {
      return <any>(b.dayNum) - <any>(a.dayNum);
    });
  }

  ngOnInit() {

     this.user = this.cognito.getUserAttributes();

    this.calendarService.getCalendarEventsByTrainerId(1).subscribe(response => {
      this.calendarEvents = response;
      this.currentWeekEvents = this.getCurrentWeekEvents(this.calendarEvents);
      this.showCurrentDay();
    });
    this.batchService.getBatchByTrainer(1).subscribe(
      result => {
        this.currentBatch = result[0];
      }
    );

    this.cs.getCurriculumByWeek(1).subscribe((values: any) => {
      this.curriculumWeek = values;
      this.curriculumDay = values.curriculumDay;
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



    //   this.eventsThisWeek = this.calendarService.getCalendarEventsByTrainerIdAndWeek(1, new Date());

    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      /*
        In our sprint, only trainers can use the program so there is no
        need to check if the user is a trainer or not, But this is where
        you might want to do that.
      */
      this.batchService.getBatchByTrainer(1).subscribe(
        result => {
          console.log(result);
          this.currentBatch = result[0];
        }
      );

      if (!this.user) {
        this.router.navigate(['login']);
      } else {
        this.cognito.getUserAttributes();
        /*
          In our sprint, only trainers can use the program so there is no
          need to check if the user is a trainer or not, But this is where
          you might want to do that.
        */
        this.batchService.getBatchesByTrainerId(1).subscribe(
          result => {
            // If the result is not null and not empty
            if (result && result.length !== 0) {
              // Get the most recent batch
              this.batch = result.sort(this.compareBatches)[result.length - 1];

              // Figure out what week the batch is in
              this.batchWeek = this.calculateWeeksBetween(new Date(this.batch.startDate), new Date()) + 1;
              const totalWeeks = this.calculateWeeksBetween(new Date(this.batch.startDate), new Date(this.batch.endDate));

              // Calculate the % progress
              const totalTime = new Date(this.batch.endDate).getTime() - new Date(this.batch.startDate).getTime();
              const elapsedTime = new Date().getTime() - new Date(this.batch.startDate).getTime();
              this.percentCompletion = elapsedTime / totalTime;

              // Percent completion must be between 0 and 1
              this.percentCompletion = (this.percentCompletion < 0) ? 0 : this.percentCompletion;
              this.percentCompletion = (this.percentCompletion > 1) ? 1 : this.percentCompletion;

              // Batch week must be > 0 and < the total number of weeks
              this.batchWeek = (this.batchWeek < 0) ? 1 : this.batchWeek;
              this.batchWeek = (this.batchWeek > totalWeeks) ? totalWeeks : this.batchWeek;
            }
          }
        );
        this.todayIsOpen = true;
      }
    }
  }

  selectDay(dayNum: number) {
    for (const day of this.dayArr) {
      day.selected = false;
    }
    this.dayArr[dayNum].selected = true;
  }

  getCurrentDayEvents(dayNumber) {
    let counter = 0;
    for (const event of this.currentWeekEvents) {
      if (new Date(event.startDateTime).getDay() === dayNumber) {
        counter++;
      }
    }
    return counter;
  }

  // Marcin
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

  // Sets the DashTitle to the selected day of the week. - Joey
  showDay(dayNumber) {
    this.selectDay(dayNumber);
    this.dataSource = [];
    for (const event of this.currentWeekEvents) {
      if (new Date(event.startDateTime).getDay() === dayNumber) {
        this.dataSource.push(event);
      }
    }
  }

  // Marcin
  showCurrentDay() {
    this.showDay(new Date().getDay());
  }
  // Changes the statusId of a particular event on screen. - Joey
  statusToggle(sub, yesNo) {
    sub.statusId = yesNo;
  }
  // Changes the flagged state of an item to mark it important - Joey
  flagRow(sub) {
    if (!sub.flaggedId) {
      sub.flaggedId = 1;
    } else {
      sub.flaggedId = 0;
    }
  }

  /**
   * This method is used t sort throught a list of batches. Batches
   * are sorted by their start dates.
   * @param a A batch
   * @param b Another batch
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
   */
  toggleEdit() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.editing = true;
  }

  /**
   * This method is called if the user cancels out of editing mode
   */
  cancelEdit() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.editing = false;
  }

  /**
   * This method is called if the user saves the changes made in editing mode.
   * It updates the user's info in the database and in session storage.
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
