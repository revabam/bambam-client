import { Subject } from 'rxjs';
import { CurriculumWeekService } from './../../../services/curriculum-week.service';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Curriculum } from './../../../models/curriculum';
import { Component, OnInit, Inject } from '@angular/core';
import { CurriculumDay } from '../../../models/curriculum-day';
import { CurriculumDayService } from '../../../services/curriculum-day.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.css']
})
export class CreateCurriculumComponent implements OnInit {
  curriculumName: string;
  numberOfWeeks: number;
  isValid = false;
  curriculum: Curriculum;
  /**
   * dialogRef - The reference to the dialog using our
   * component, which allows us to close the dialog when we're
   * done.
   * data - Received from the parent component
   * of this modal component, enabling the current component
   * to retrieve and update what's in the parent component
   */
  cnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  cweekFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  constructor(
    public dialogRef: MatDialogRef<CreateCurriculumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,
    private curriculumDayService: CurriculumDayService,
    private curriculumWeekService: CurriculumWeekService,
    ) { }


  ngOnInit() {
  }

  /**
   * When the user decides to close the dialog.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  close(): void {
    this.dialogRef.close(this.curriculum);
  }

  /**
   * Creates a Curriculum object from the variables binded to the UI,
   * to the UI, the timestamp of the current time, and the user_id
   * of the user's current session.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  createNewCurriculum(): void {
    // Creates the weeks and days to add the curriculum
    const newCurriculum: Curriculum = {
      name: this.curriculumName,
      version: 1,
      creatorId: 1,
      dateCreated: new Date(),
      numberOfWeeks: this.numberOfWeeks,
      status: 1,
    };

    /**
     * After the Curriculum object is created, we make
     * an http post. Also, if the post is successful, we
     * push it to the parent component's curriculum array
     * so that the user can see the changes.
     */
    this.data['curriculumService'].post(newCurriculum).subscribe( (curr: Curriculum) => {
      const newVersion = curr.version;
      let nameNum = 1;
      for (let i = 0; i < this.data['curriculums'].length; i++) {
        if (this.data['curriculums'][i].name === newCurriculum.name) {
          if (this.data['curriculums'][i].version >= nameNum) {
            nameNum += 1;
          } else {
            continue;
          }
        }
      }

      curr.version = nameNum;
      if (curr !== undefined && curr !== null) {
        this.data['curriculums'].push(curr);

        // save weeks
        if (curr.numberOfWeeks > 0) {
          // save the first week, start from week 1
          this.saveWeek(curr, 1);
        }

      } else {
        this.data['curriculums'].push(newCurriculum);
      }
    }, err => {
    });
    // After the curriculum is added, we're done with the modal.
    this.close();
  }

  /**
   * Creates and persists a week for the given curriculum
   * @param curriculum curriculum to save to
   * @param weekNum weekNum for week to create and save
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  saveWeek(curriculum: Curriculum, weekNum: number) {
    // Creates the weeks here
    const week: CurriculumWeek = {
      curriculumId: curriculum.id,
      weekNum: weekNum
    };
    this.curriculumWeekService.post(week).subscribe((savedWeek) => {
      // creates and persists the days for the week starting from 1 (Monday)
      this.saveDay(curriculum, savedWeek, 1);
    });
  }

  /**
   * Creates and persists days for a given week
   * @param curriculum curriculum to save to
   * @param week week to save to
   * @param index index/day to create and save
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  saveDay(curriculum: Curriculum, week: CurriculumWeek, index: number) {
    const day: CurriculumDay = {
      dayNum: index,
      weekId: week.id,
      daySubTopics: []
    };
    this.curriculumDayService.post(day).subscribe(() => {
      // make sure there is only 5 days in a work week
      if (index < 5) {
        index++;
        this.saveDay(curriculum, week, index);
      } else {
        // check to see if it needs more weeks to be created
        if (week.weekNum < curriculum.numberOfWeeks) {
          // Save the next week
          const weekNum = week.weekNum + 1;
          this.saveWeek(curriculum, weekNum);
        } else {
          // done with all days and weeks, refresh page
          console.log('Refreshing page');
          // this.refresh.next();
        }
      }
    });
  }

  /**
   * validation for the curriculum entered
   * the submit button is disabled until both name and weeks are entered correctly
   * curriculumName user input to validate
   * numberOfWeeks user input to validate
   * @author - Stephen Hong | Spark1806-USF-Java | Steven Kelsey
   */
  validate() {
    this.isValid = true;
    // validating user input
    if (!this.curriculumName || !this.numberOfWeeks) {
      this.isValid = false;
    } else {
      // if curriculum name is valid
      if (this.curriculumName.length < 2) {
        this.isValid = false;
      }
      // if curriculum weeks is valid
      if (this.numberOfWeeks < 1) {
        this.isValid = false;
      }
    }
  }
}
