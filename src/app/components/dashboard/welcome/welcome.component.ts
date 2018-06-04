import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BamUser } from '../../../models/bamuser.model';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { BatchProgressBarComponent } from '../batch-progress-bar/batch-progress-bar.component';

/**
 * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
 * Welcome component to handle the welcome view
 */

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public currentUser: BamUser;
  public message: String;
  public batchCount: number;
  public batches: Batch [];
  public selectedBatch: Batch;

  constructor(private batchService: BatchService,
              private sessionService: SessionService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.currentUser = this.sessionService.getUser();
    if (this.sessionService.getSelectedBatch()) {
      this.selectedBatch = this.sessionService.getSelectedBatch();
      this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
      this.getInProgressBatches();
    } else {
      this.getInProgressBatches();

    }
  }

  /**
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   * Function to get in-progress batches using the batches service.
   * and setting the response data to batches array.
   */
  getInProgressBatches() {
    // this.batchService.getAllBatchesInProgress(this.currentUser.email).subscribe(

    this.batchService.getBatchAll().subscribe(response => {
        this.batches = response;
        if (this.batches !== null) {
          this.batchCount =  this.batches.length;
        } else {
          this.batchCount =  0;
        }
        this.setAllneededVars();
      });
  }

  /**
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   * When a batch got selected it will set the selected batch into session.
   */
  setSelected() {
    this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
  }


  /**
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   * To set all needed varables for the welcome componet
   */
  setAllneededVars() {
    if (this.batchCount > 1) {
      this.message = 'You have more than one current batch';
    } else if (this.batchCount === 1) {
      this.selectedBatch = this.batches.pop();
      this.sessionService.putSelectedBatchIntoSession(this.selectedBatch);
    } else {
      this.batchCount = 0;
      this.message = 'You have no current batches';
    }
  }
  /**
   * @author Mohamed Swelam -- batch: 1712-dec11-Java-Steve
   *
   * To compare batches for selected batch.
   * @returns true if batches match , false otherwise.
   */
  compareBatch(b1: Batch, b2: Batch): boolean {
    return b1 && b2 ? b1.id === b2.id : b1 === b2;
 }
}
