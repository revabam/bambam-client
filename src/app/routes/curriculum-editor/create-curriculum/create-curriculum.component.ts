import { CurriculumWeekService } from './../../../services/curriculum-week.service';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateVersionComponent } from './../create-version/create-version.component';
import { Curriculum } from './../../../models/curriculum';
import { Component, OnInit, Inject } from '@angular/core';
import { CurriculumDay } from '../../../models/curriculum-day';
import { CurriculumDayService } from '../../../services/curriculum-day.service';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.css']
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
    @Inject(MAT_DIALOG_DATA) public data: object,
    private curriculumDayService: CurriculumDayService,
    private curriculumWeekService: CurriculumWeekService
    ) { }

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
    const newCurriculum: Curriculum = {
      name: this.curriculumName,
      version: 1,
      creatorId: 1,
      dateCreated: new Date(),
      numberOfWeeks: this.numberOfWeeks,
      status: 1,
    };

    /*
     * After the Curriculum object is created, we make
     * an http post. Also, if the post is successful, we
     * push it to the parent component's curriculum array
     * so that the user can see the changes.
     */
    this.data['curriculumService'].post(newCurriculum).subscribe( (curr: Curriculum) => {
      if (curr !== undefined && curr !== null) {
        this.data['curriculums'].push(curr);

        // add weeks to the curriculum
        for (let i = 0; i < this.numberOfWeeks; i++) {
          // Creates the weeks here
          const week: CurriculumWeek = {
            curriculumId: curr.id,
            weekNum: i + 1
          };
          this.curriculumWeekService.post(week).subscribe( (savedWeek) => {
            console.log('saved week');
            console.log(savedWeek);

            for (let d = 1; d < 6; d++) {
              // Creates the new day, numbers 2 - 5 for Monday through Friday
              const day: CurriculumDay = {
                dayNum: d,
                weekId: savedWeek.id,
                daySubTopics: []
              };
              this.curriculumDayService.post(day).subscribe( (savedDay) => {
              });
            }
          });
        }

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
