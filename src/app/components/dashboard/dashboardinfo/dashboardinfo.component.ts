import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../../models/bamuser.model';
import { Batch } from '../../../models/batch.model';
import { BatchType } from '../../../models/batchtype.model';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { CalendarService } from '../../../services/calendar.service';
import { Observable } from 'rxjs';

/**
 * @author David Graves -- batch: 1712-dec-Java-Steve
 * Dashboardinfo component to display trainer name and current batch progress by date
 */
@Component({
  selector: 'app-dashboardinfo',
  templateUrl: './dashboardinfo.component.html',
  styleUrls: ['./dashboardinfo.component.css']
})
export class DashboardInfoComponent implements OnInit {

  user: BamUser;
  batch: Batch;
  currentBatchStart1: Date;
  currentBatchEnd1: Date;
  weekNum: number;
  batchId: number;
  batchObs: Observable<Batch>;

  constructor(private batchService: BatchService,
    private sessionService: SessionService) { }

  /**
   * @author David Graves -- batch: 1712-dec-Java-Steve
   * Subscribes to obtain current batch info to deterime start and end date, as well as current week.
   */
  batchSubscribe() {
    this.sessionService.selectedBatchSubject.subscribe(data =>  {
      this.batchId = data.id;
      this.batchObs = this.batchService.getBatchById(this.batchId);
      this.batchObs.subscribe(
        data1 => {
          if (data1 != null) {

            this.batch = data1;
            this.setProperties(this.batch);
          }
        });
    });
  }

  /**
   * @author David Graves -- batch: 1712-dec-Java-Steve
   * Sets properties based on the Batch object sent to it.
   */
  setProperties(batch1: Batch) {
    this.currentBatchStart1 = batch1.startDate;
    this.currentBatchEnd1 = batch1.endDate;
    let timePassed = 0;
    this.weekNum = 0;
    if (new Date() < this.currentBatchEnd1) {
      timePassed = (new Date().getTime()
      - new Date(this.currentBatchStart1).getTime());
    } else {
      timePassed = (new Date(this.currentBatchEnd1).getTime() -
      new Date(this.currentBatchStart1).getTime());
    }
    if (timePassed < 0) { // if the batch hasn't started yet
      this.weekNum = 0;
    } else {
      this.weekNum = Math.floor((((timePassed / (1000 * 60 * 60 * 24)) + 1) / 7) + 1);
    }
  }

  /**
   * @author David Graves -- batch: 1712-dec-Java-Steve
   * On init: uses bamUser stored in localStorage to populate trainer-specific information.
   * Subscribes to obtain current batch info to deterime start and end date, as well as current week.
   */
  ngOnInit() {
    this.user = this.sessionService.getUser();
    if (sessionStorage.getItem('batch') != null) {
      this.batch = JSON.parse(sessionStorage.getItem('batch'));
      this.setProperties(this.batch);
    }
    this.batchSubscribe();
  }
}
