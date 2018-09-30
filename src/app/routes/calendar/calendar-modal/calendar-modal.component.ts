import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css']
})
export class CalendarModalComponent {

  /**
  * @author Kyle Smith, Aaron Mathews
  * @param dialogRef - The reference to the dialog using our
  * component, which allows us to close the dialog when we're
  * done.
  * @param data - Received from the parent component
  * of this modal component, enabling the current component
  * to retrieve and update what's in the parent component
  */
  constructor(private dialogRef: MatDialogRef<CalendarModalComponent>, @Inject(MAT_DIALOG_DATA) public data: object) { }

  /**
   * is used to display the correct version of the modal
   */
  moving = false;
  /**
   * -1 if events are to be pushed back
   * 0 if they aren't changing
   * 1 if moving forward
   */
  decision = 0;
  /**
   * closes the modal and sends back the decision
   */
  close() {
    this.dialogRef.close(this.decision);
  }

  /**
   * displays the version of the modal used to move events
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  moveEvents() {
    this.moving = true;
  }

  /**
   * go back to the regular version of the page
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  back() {
    this.moving = false;
  }

  /**
   * move events forward one day
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  moveForward() {
    this.decision = 1;
    this.close();
  }

  /**
   * move events back one day
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  moveBack() {
    this.decision = -1;
    this.close();
  }
}
