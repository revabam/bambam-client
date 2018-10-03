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
  numberOfWeeks: number;
  selectedTopics: Topic[];

  /**
   * @param dialogRef - The reference to the dialog using our
   * component, which allows us to close the dialog when we're
   * done.
   * @param data - Received from the parent component
   * of this modal component, enabling the current component
   * to retrieve and update what's in the parent component
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  constructor(
    public dialogRef: MatDialogRef<CreateVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

  /**
   * When the user decides to close the dialog.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Creates a Curriculum object from the variables binded to the UI,
   * to the UI, the timestamp of the current time, and the user_id
   * of the user's current session.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  add(): void {
    const newCurriculum: Curriculum = {
      name: this.selectedCurriculumName,
      /*
       * this.data['getCurriculumsByName'] is a function that
       * returns an array of Curriculums sorted from newest
       * version to oldest version, so we take the version of
       * first element and add by 1
       */
      version: +this.data['getCurriculumsByName'](
        this.selectedCurriculumName)[0].version + 1,
      creatorId: JSON.parse(sessionStorage['user'])['id'],
      dateCreated: new Date(),
      numberOfWeeks: this.numberOfWeeks,
      topics: this.selectedTopics,
      curriculumWeeks: [],
      status: 1
    };
    /*
     * After the Curriculum object is created, we make
     * an http post. Also, if the post is successful, we
     * push it to the parent component's curriculum array
     * so that the user can see the changes.
     */
    this.data['curriculumService'].post(newCurriculum).subscribe(curr => {
      if (curr !== undefined && curr !== null) {
        this.data['curriculums'].push(curr);
      }
    }, err => {
    });
    // After the curriculum is added, we're done with the modal.
    this.close();
  }

}
