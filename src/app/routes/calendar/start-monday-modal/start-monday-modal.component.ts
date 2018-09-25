import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-start-monday-modal',
  templateUrl: './start-monday-modal.component.html',
  styleUrls: ['./start-monday-modal.component.css']
})
/**
 * modal box that pops up when you try to insert a new curriculum into the calendar
 */
export class StartMondayModalComponent {

  /**
  * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
  * @param dialogRef - The reference to the dialog using our
  * component, which allows us to close the dialog when we're
  * done.
  * @param data - Received from the parent component
  * of this modal component, enabling the current component
  * to retrieve and update what's in the parent component
  */
  constructor(private dialogRef: MatDialogRef<StartMondayModalComponent>, @Inject(MAT_DIALOG_DATA) public data: object) { }

  decision = false;

  /**
   * closes the modal and returns an Observable with the boolean decision
   *
   *  @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  close() {
    this.dialogRef.close(this.decision);
  }

  /**
   * marks the decision as true and closes the modal
   *
   * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  startOnMonday() {
    this.decision = true;
    this.close();
  }
}
