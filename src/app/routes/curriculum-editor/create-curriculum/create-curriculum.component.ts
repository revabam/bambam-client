import { CurriculumWeek } from './../../../models/curriculum-week';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateVersionComponent } from './../create-version/create-version.component';
import { Curriculum } from './../../../models/curriculum';
import { Component, OnInit, Inject } from '@angular/core';
import { CurriculumDay } from '../../../models/curriculum-day';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.scss']
})
export class CreateCurriculumComponent implements OnInit {

  curriculumName: string;
  numberOfWeeks: number;

  /**
   * @param dialogRef - The reference to the dialog using our
   * component, which allows us to close the dialog when we're
   * done.
   * @param data - Received from the parent component
   * of this modal component, enabling the current component
   * to retrieve and update what's in the parent component
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  constructor(
    public dialogRef: MatDialogRef<CreateVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) { }

  ngOnInit() {
  }
  /**
   * When the user decides to close the dialog.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  close(): void {
    this.dialogRef.close();
  }



  /**
   * Creates a Curriculum object from the variables binded to the UI,
   * to the UI, the timestamp of the current time, and the user_id
   * of the user's current session.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  createNewCurriculum(): void {
    console.log('Creating curriculum');
    // Creates the weeks and days to add the curriculum
    const weeks = [];
    for (let i = 0; i < this.numberOfWeeks; i++) {
      const days = [];
      for (let d = 2; d < 7; d++) {
        // Creates the new day, numbers 2 - 5 for Monday through Friday
        const day: CurriculumDay = {
          dayNum: d,
          supTopics: []
        };
        days.push(day);
      }

      // Creates the weeks here
      const week: CurriculumWeek = {
        curriculumDays: days,
        weekNum: i + 1
      };
      weeks.push(week);
    }

    const newCurriculum: Curriculum = {
      name: this.curriculumName,
      version: 1,
      creatorId: JSON.parse(sessionStorage['user'])['id'],
      dateCreated: new Date(),
      numberOfWeeks: this.numberOfWeeks,
      topics: [],
      curriculumWeeks: weeks
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
      } else {
        console.log('returned null');
        this.data['curriculums'].push(newCurriculum);
      }
    }, err => {
      console.log('[ERROR] Create-curriculum: An error occured');
      console.log(err);
      this.data['curriculums'].push(newCurriculum);
    });
    // After the curriculum is added, we're done with the modal.
    this.close();
  }
}
