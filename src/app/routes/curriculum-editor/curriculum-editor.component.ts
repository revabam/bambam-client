import { DaySubtopicService } from './../../services/day-subtopic.service';
import { CurriculumWeekService } from './../../services/curriculum-week.service';
import { CurriculumDay } from './../../models/curriculum-day';
import { CreateVersionComponent } from '../../routes/curriculum-editor/create-version/create-version.component';
import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../services/curriculum.service';
import { Curriculum } from '../../models/curriculum';
import { MatDialog } from '@angular/material';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';
import { CurriculumDayService } from '../../services/curriculum-day.service';
import { weekdays } from 'moment';


@Component({
  selector: 'app-curriculum-editor',
  templateUrl: './curriculum-editor.component.html',
  styleUrls: ['./curriculum-editor.component.css']
})
export class CurriculumEditorComponent implements OnInit {
  // Arrays of all the elements we're fetching from the server.
  curriculums: Curriculum[] = [];
  curriculumNames: string[] = [];

  selectedCurriculum: Curriculum;

  /**
   * @param curriculumService - The service (defined by us)
   * that we're using to fetch all the curriculums from a server.
   * @param dialog - The dialog is injected into our component so
   * that we can use the modals.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  constructor(
    private curriculumService: CurriculumService,
    private curriculumDayService: CurriculumDayService,
    private curriculumWeekService: CurriculumWeekService,
    private daySubTopicService: DaySubtopicService,
    public dialog: MatDialog,
  ) { }

  /*
   * We're invoking our services' fetch statements so
   * that we can display our data on our page.
   */
  ngOnInit() {
    this.getAllCurriculums();
  }

  /**
   * Grabs all of the curriculums from the database.
   * Subscribe is what enables us to get the actual object
   * from the Observable returned by the service.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  getAllCurriculums(): void {
    this.curriculumService.getAll().subscribe(curriculums => {
      this.curriculums = curriculums;
      this.curriculumNames = this.getUniqueNames();
    });
  }

  /**
   * Gets us distinct curriculum names from the list of all
   * curriculums
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  getUniqueNames(): string[] {
    let names: string[] = this.curriculums.map(curr => curr.name);
    // If it is deactivated, then we don't create a
    // separate unique name for that.
    names = names.map((name) => this.curriculumService.reactivateName(name));
    return names.filter((name, i, arr) => name && arr.indexOf(name) === i);
  }

  /**
   * Gets us all of the curriculums that have a certain name.
   * Also, orders it from highest version to lowest version.
   * It also looks for deactivated versions with that name.
   * @param name - the name of the curricula that we seek.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  getCurriculumsByName(name: string): Curriculum[] {
    const curriculumsWithName: Curriculum[] = this.curriculums.filter(
      (curriculum) => curriculum && (curriculum.name === name
        || this.curriculumService.reactivateName(curriculum.name)
        === name));
    // Ordering from highest version to lowest version
    curriculumsWithName.sort(function (makeBigger: Curriculum,
      makeSmaller: Curriculum): number {
      return makeSmaller.version - makeBigger.version;
    });
    return curriculumsWithName;
  }
  /**
   * Selects the passed in curriculum to be injected into the curriculum view component.
   * Pulls the week data and the day and subtopic data for the curriculum
   * @param curriculum the curriculum you want to display in the curriculum view component.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  selectCurriculum(curriculum: Curriculum) {
    this.getAllCurriculumData(curriculum);
  }

  /**
   * Gets all the days, weeks, and subtopics for a given curriculum. Also updates the drag and drop
   * id list
   * @param curriculum the curriculum you wnat to eager load
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  getAllCurriculumData(curriculum: Curriculum): Curriculum {
    // reset curriculumWeeks
    curriculum.curriculumWeeks = [];

    // this list is needed to allow drag and drop
    const curriculumDayIds: string[] = [];

    // Get all daySubTopics, days, and weeks
    this.daySubTopicService.getAll().subscribe((daySubTopics) => {
      console.log('got all daySubtopics');
      console.log(daySubTopics);
      this.curriculumDayService.getAll().subscribe((curriculumDays) => {
        console.log('got all days');
        console.log(curriculumDays);
        this.curriculumWeekService.getAll().subscribe((curriculumWeeks) => {
          console.log('got all days');
          console.log(curriculumWeeks);
          // Add weeks to the curriculum
          curriculumWeeks.forEach((week) => {
            if (week.curriculumId === curriculum.id) {
              curriculum.curriculumWeeks.push(week);
            }
          });
          // sort week by weekNum
          curriculum.curriculumWeeks.sort((a, b) => a.weekNum - b.weekNum);

          // Add days to weeks
          curriculum.curriculumWeeks.forEach((week) => {
            week.curriculumDays = [];
            curriculumDays.forEach((day) => {
              if (day.weekId === week.id) {
                week.curriculumDays.push(day);
                // add to list of day id's for drag and drop
                curriculumDayIds.push(day.id.toString());
              }
            });

            // Sort day by dayNum
            week.curriculumDays.sort((a, b) => a.dayNum - b.dayNum);

            // Add subtopics to days
            week.curriculumDays.forEach((day) => {
              day.daySubTopics = [];
              daySubTopics.forEach((daySubTopic) => {
                if (daySubTopic.dayId === day.id) {
                  day.daySubTopics.push(daySubTopic);
                }
              });

              // sort saySubTopic by index
              day.daySubTopics.sort((a, b) => a.index - b.index);
            });
          });

          // set as current curriculum
          this.selectedCurriculum = curriculum;

          // save the id's for drag and drop
          this.daySubTopicService.dragAndDropList = curriculumDayIds;
        });
      });
    });

    return curriculum;
  }

  /**
   * When we invoke this function, it opens up the modal that we use
   * to create new curriculum.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  createNewCurriculumDialog(): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    const dialogRef = this.dialog.open(CreateCurriculumComponent,
      /*
      * An object is passed in as the second parameter, which
      * defines properties of the dialog modal, as well as the
      * data that we'll pass in for the modal component to access.
      * We need to allow the child component to access the
      * getCurriculumsByName so that the child component can get
      * the highest version number and increment by one.
      */
      {
        width: '600px',
        data: {
          curriculums: this.curriculums,
          curriculumNames: this.curriculumNames,
          topics: [],
          curriculumService: this.curriculumService,
          getCurriculumsByName: this.getCurriculumsByName
        }
      }
    );
  }
  /**
   * When we invoke this function, it opens up the modal that we use
   * to create new versions of a curriculum.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  openDialog(): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    const dialogRef = this.dialog.open(CreateVersionComponent,
      /*
      * An object is passed in as the second parameter, which
      * defines properties of the dialog modal, as well as the
      * data that we'll pass in for the modal component to access.
      * We need to allow the child component to access the
      * getCurriculumsByName so that the child component can get
      * the highest version number and increment by one.
      */
      {
        width: '600px',
        data: {
          curriculums: this.curriculums,
          curriculumNames: this.curriculumNames,
          topics: [],
          curriculumService: this.curriculumService,
          getCurriculumsByName: this.getCurriculumsByName
        }
      }
    );
  }
  /**
   * Calls the deactivate function from the curriculum
   * service.
   * @param curriculum - The curriculum to be deactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  deactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.deactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        curriculum.name = this.curriculumService.deactivateName(
          curriculum.name
        );
      },
      err => {
      }
    );
  }
  /**
   * Calls the reactivate function from the curriculum
   * service.
   * @param curriculum - The curriculum to be reactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  reactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.reactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        curriculum.name = this.curriculumService.reactivateName(
          curriculum.name
        );
      },
      err => {
      }
    );
  }
}
