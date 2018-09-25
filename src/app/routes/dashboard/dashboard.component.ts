import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../models/bam-user';
import { Router } from '@angular/router';
import { Batch } from '../../models/batch';
import { BatchService } from '../../services/batch.service';
import { Curriculum } from '../../models/curriculum';
import { UserService } from '../../services/user.service';

/**
 * This component is the dashboard page. It is the page that the
 * user is directed to after they login. It displays personal
 * information and batch information to the user.
 *
 * @author Bradley Walker | Khaleel Williams | 1806-Jun18-USF-Java | Wezley Singleton
 */
export interface Topicz {
  id: number;
  name: string;
  time: string;
}

const topics: Topicz[] = [
  {
    id: 1,
    name: 'science',
    time: 'noon'
  },
  {
    id: 2,
    name: 'math',
    time: 'noon'
  },
  {
    id: 3,
    name: 'mom',
    time: 'noon'
  },
  {
    id: 4,
    name: 'SAT prep',
    time: 'noon'
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource = topics;
  headerColumns: string[] = ['idno', 'sub', 'time', 'control'];

  user: BamUser;
  batch: Batch;
  batchWeek: number;
  percentCompletion: number;
  editing = false;
  firstName: string;
  lastName: string;
  isOpen = 0;
  visibilityIcon = [{num: 0, icon: 'visibility_off' },
                    {num: 1, icon: 'visibility'}];
  DashTitle = 'Today';



  constructor(
    private router: Router,
    private batchService: BatchService,
    private userService: UserService
  ) { }

  /**
  * This method runs when the component is initialized. It will get the user
  * data from the session storage and display both the user's personal info,
  * and info about the batch they are associated with.
  */
  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('user'));

    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      /*
        In our sprint, only trainers can use the program so there is no
        need to check if the user is a trainer or not, But this is where
        you might want to do that.
      */
      this.batchService.getBatchesByTrainerId(12).subscribe(
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
    }
  }


  growl(x) {
    console.log(x);
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
