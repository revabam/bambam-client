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
export class StartMondayModalComponent implements OnInit {

  /**
  * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
  * @param dialogRef - The reference to the dialog using our
  * component, which allows us to close the dialog when we're
  * done.
  * @param data - Received from the parent component
  * of this modal component, enabling the current component
  * to retrieve and update what's in the parent component
  */
  constructor(private dialogRef: MatDialogRef<StartMondayModalComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    curriculumName: string,
    startDate: Date
  }) { }

  decision: Date = null;
  prevMonday: Date;

  ngOnInit() {
    const start = this.data.startDate;
    if (this.data.startDate.getDay() !== 1) {
      const weekday: number = start.getDay();
      this.prevMonday = new Date(start);
      this.prevMonday.setDate(start.getDate() - weekday + 1);
    }
  }
  /**
   * returns decision if user doesn't want to start the curriculum on that day or previous Monday
   * default decision is NO
   *
   *  @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  close() {
    this.dialogRef.close(this.decision);
  }

  /**
   * marks the decision as MON and closes the modal
   *
   * @author Marcin Salamon | Alex Moraga | Spark1806-USF-Java | Steven Kelsey
   */
  startOnMonday() {
    this.decision = this.prevMonday;
    this.close();
  }

  /**
   * returns the decision as CUR for day specified and closes the modal
   *
   * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
   */
  startOnCurrentDay() {
    this.decision = this.data.startDate;
    this.close();
  }
}
