import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../../models/bam-user';
import { Router } from '@angular/router';
import { Batch } from '../../../models/batch';
import { BatchService } from '../../../services/batch/batch.service';
import { UserIdleService } from '../../../../../node_modules/angular-user-idle';
import { AlertsService } from '../../../../../node_modules/angular-alert-module';
import { timeout } from '../../../../../node_modules/@types/q';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private router: Router,
    private batchService: BatchService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    if (!this.user) {
      this.router.navigate(['login']);
    } else {
      /*
        In our sprint, only trainers can use the program so there is no
        need to check if the user is a trainer or not.
      */
      this.batchService.getBatchesByTrainerId(this.user.id).subscribe(
        result => {
          // If the result is not null and not empty
          if (result && result.length !== 0) {
            this.batch = result.sort(this.compareBatches)[result.length - 1];

            // Figure out what week the batch is in
            this.batchWeek = this.calculateWeeksBetween(new Date(this.batch.startDate), new Date()) + 1;

            // Calculate the % progress
            const totalTime = new Date(this.batch.endDate).getTime() - new Date(this.batch.startDate).getTime();
            const elapsedTime = new Date().getTime() - new Date(this.batch.startDate).getTime();
            this.percentCompletion = elapsedTime / totalTime;
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
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date1_ms - date2_ms);
    // Convert back to weeks and return hole weeks
    return Math.floor(difference_ms / ONE_WEEK);
  }
}
