import { Component, OnInit, Input } from '@angular/core';
import { Batch } from '../../../models/batch.model';
import { BatchType } from '../../../models/batchtype.model';
import { Output } from '@angular/core/src/metadata/directives';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.css']
})

/**  Class for edit the current batch.
 * @author Patrick Kennedy | Batch: 1712-Steve
 * @author Shane Avery Sistoza | Batch: 1712-Steve
 */
export class EditBatchComponent implements OnInit {
  // Specific to batch
  @Input() batch: Batch = new Batch(null, null, null, null, null, null, null);
  batchTypes: BatchType[];

  // Specific to associates that are apart of the batch.
  @Input() searchTerm: string;
  views = 0;
  associateAlertType: string;
  associateAlertMessage: string;

  constructor(private batchService: BatchService, private sessionService: SessionService, private alertService: AlertService) {
  }

  /**
   * Get the object of batch type.
   * Submit and persist updated changes to the batch.
   * Persist updated changes to the session storage.
   *
   * @param      {number}  typeId  The type id the batch wil change to.
   */
  submit(typeId) {

    if (this.batch.startDate > this.batch.endDate) {
      this.batchAlert('danger', `Error: End date can't be earlier than start date.`);
      return;
    }

    let selectedType: BatchType;
    for (let i = 0; i < this.batchTypes.length; i++) {
      if (typeId === this.batchTypes[i].id) {
        selectedType = this.batchTypes[i];
        break;
      }
    }

    // this.batch.type = selectedType;    //BATCH TYPE DOESN'T EXIST ANY MORE
    this.batchService.updateBatch(this.batch).subscribe( status => {
      this.batchAlert('success', `Updated:  ${this.batch.name} successfully! `);
      this.sessionService.putSelectedBatchIntoSession(this.batch);
    }, error => {
      this.batchAlert('danger', `Error: Update ${this.batch.name} unsuccessful! `);
    });
  }

  /**
   * Adds a timed notification whether or not the updating batch was successful.
   *
   * @param      {string}  type     The type of notification {danger or success}.
   * @param      {string}  message  The message for notification.
   */
  batchAlert(type, message) {
    this.alertService.alert(type, message);
  }

  /**
   * Adds a timed notification whether or not adding or removing an associate was successful.
   * @param      {[string, string]}  assoc   Contains 2 string values type and messsage.
   */
  associateAlert(assoc) {
    this.alertService.alert(assoc.type, assoc.message);
  }

  /**
   * Change the end date of this batch.
   *
   * @param      {string}  newDate  The new date being modified to.
   */
  endDateChanged(newDate) {
    this.batch.endDate = new Date(newDate);
  }

  /**
   * Change the start date of this batch.
   *
   * @param      {string}  newDate  The new date being modified to.
   */
  startDateChanged(newDate) {
    this.batch.startDate = new Date(newDate);
  }

  ngOnInit() {
    this.batch = this.sessionService.getSelectedBatch();
    this.batchService.getAllBatchTypes().subscribe( types => this.batchTypes = types);
  }
}
