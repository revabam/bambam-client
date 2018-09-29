import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-duplicate-modal',
  templateUrl: './event-duplicate-modal.component.html',
  styleUrls: ['./event-duplicate-modal.component.scss']
})
export class EventDuplicateModalComponent {

  /**
  * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
  * @param dialogRef - The reference to the dialog using our
  * component, which allows us to close the dialog when we're
  * done.
  * @param data - Received from the parent component
  * of this modal component, enabling the current component
  * to retrieve and update what's in the parent component
  */
  constructor(private dialogRef: MatDialogRef<EventDuplicateModalComponent>, @Inject(MAT_DIALOG_DATA) public data: object) { }
  decision = false;
  close() {
    this.dialogRef.close(this.decision);
  }

  overrideEvent() {
    this.decision = true;
    this.close();
  }

}
