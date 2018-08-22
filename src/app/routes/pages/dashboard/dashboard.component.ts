import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../../models/bam-user';
import { Router } from '@angular/router';
import { Batch } from '../../../models/batch';
import { BatchService } from '../../../services/batch/batch.service';
import { UserIdleService } from '../../../../../node_modules/angular-user-idle';
import { timeout } from '../../../../../node_modules/@types/q';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: BamUser;
  batch: Batch;
  batchWeek: number;
  percentCompletion: number;
  editing = false;
  firstName: string;
  lastName: string;

  constructor(
    private router: Router,
    private batchService: BatchService,
    private userService: UserService
  ) { }

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
      this.batchService.getBatchesByTrainerId(this.user.id).subscribe(
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

  compareBatches(a: Batch, b: Batch) {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }
    return 0;
  }

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

  toggleEdit() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.editing = true;
  }

  cancelEdit() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.editing = false;
  }
  saveChanges() {
    this.userService.updateInfo(this.user).subscribe(
      result => {
        sessionStorage.setItem('user', JSON.stringify(this.user));
      }
    );
    this.editing = false;
  }
}
