import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Curriculum } from '../../../models/curriculum';
import { Topic } from '../../../models/topic';

@Component({
  selector: 'app-create-version',
  templateUrl: './create-version.component.html',
  styleUrls: ['./create-version.component.css']
})
export class CreateVersionComponent {
  // Variables binded to our template, used to retrieve UI inputs
  selectedCurriculumName: string;
  version: string;
  numberOfWeeks: number;
  selectedTopics: Topic[];

  /**
   * @param dialogRef - The reference to the dialog using our
   * component, which allows us to close the dialog when we're
   * done.
   * @param data - Received from the parent component
   * of this modal component, enabling the current component
   * to retrieve and update what's in the parent component
   */
  constructor(
    public dialogRef: MatDialogRef<CreateVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

  /**
   * When the user decides to close the dialog.
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Creates a Curriculum object from the variables binded to the UI,
   * to the UI, the timestamp of the current time, and the user_id
   * of the user's current session.
   */
  add(): void {
    const newCurriculum: Curriculum = {
      name: this.selectedCurriculumName,
      version: this.version,
      creator_id: JSON.parse(sessionStorage['user'])['id'],
      dateCreated: new Date(),
      numberOfWeeks: this.numberOfWeeks,
      topics: this.selectedTopics
    };
    /*
     * After the Curriculum object is created, we make
     * an http post. Also, if the post is successful, we
     * push it to the parent component's curriculum array
     * so that the user can see the changes.
     */
    this.data['curriculumService'].post(newCurriculum).subscribe(curr => {
      console.log(curr);
      if (curr !== undefined && curr !== null) {
        this.data['curriculums'].push(curr);
      }
    });
    // After the curriculum is added, we're done with the modal.
    this.close();
  }

}