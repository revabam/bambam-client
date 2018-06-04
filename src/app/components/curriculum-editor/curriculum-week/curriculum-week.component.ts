import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WeeksDTO } from '../../../models/weeksDTO.model';
import { CurriculumSubtopic } from '../../../models/curriculumSubtopicZ.model';
import { MainCurriculumViewComponent } from '../main-curriculum-view/main-curriculum-view.component';
import { CourseStructureComponent } from '../course-structure/course-structure.component';
import { Curriculum } from '../../../models/curriculum.model';
import { DragndropService } from '../../../services/dragndrop.service';
import { SubtopicName } from '../../../models/subtopicname.model';
import { DaysDTO } from '../../../models/daysDTO.model';

/**
 * Authors: Daniel Robinson, Tyler Dresselhouse, Dylan Britton
 * Creates array of days in a week for curriculum view
 */

@Component({
  selector: 'app-curriculum-week',
  templateUrl: './curriculum-week.component.html',
  styleUrls: ['./curriculum-week.component.css']
})

export class CurriculumWeekComponent implements OnInit {

  @Input() weekCurrSubtopics: CurriculumSubtopic[] = [];
  @Input() weekNum: number;
  monday: DaysDTO = new DaysDTO([]);
  tuesday: DaysDTO = new DaysDTO([]);
  wednesday: DaysDTO = new DaysDTO([]);
  thursday: DaysDTO = new DaysDTO([]);
  friday: DaysDTO = new DaysDTO([]);
  weekDTO: WeeksDTO = new WeeksDTO([]);
  @Input() readOnly: boolean;
  @Output() removeWeekEvent = new EventEmitter<number>();
  topicType: string[]= [];
  percentageMap = {};
  total = 0;
  percentageNums = [];
  percentageNames = [];
  pickUpDay = -1;

  constructor(private dndService: DragndropService,
    private courseStructureComponent: CourseStructureComponent) { }

  currentlyDragged;

  ngOnInit() {
    this.sortSubtopics();
    // this.progressBar();
  }
  /**
   * This method returns the subtopic-topic names for the progress bar and a visual
   * representation of the topics for the bar.
   *
   * @author James Holzer, Shane Sistoza, Jeffrey Camacho, Jordan DeLong (1712-Steve)
   */
  progressBar() {
    this.weekDTO.days.forEach(element => {
      element.subtopics.forEach(subtopic => {
        if (this.percentageMap[subtopic.parentTopic.topicName] === undefined) {
          this.percentageMap[subtopic.parentTopic.topicName] = 1 ;
          this.total++;
          }else {
            this.percentageMap[subtopic.parentTopic.topicName] += 1 ;
            this.total++;
          }
      });
    });
    this.percentageNums = Object.values(this.percentageMap);
    this.percentageNames = Object.keys(this.percentageMap);
  }
  /**
   * This method is usesd to go through the week and set the subtopics to the correct day
   * of the week
   * @author James Holzer, Dan Robinson
   */
  sortSubtopics() {
    this.weekCurrSubtopics.forEach(elem => {
      switch (elem.curriculumSubtopicDay) {
        case 1:
          this.monday.subtopics.push(elem.curriculumSubtopicNameId);
          break;
        case 2:
          this.tuesday.subtopics.push(elem.curriculumSubtopicNameId);
          break;
        case 3:
          this.wednesday.subtopics.push(elem.curriculumSubtopicNameId);
          break;
        case 4:
          this.thursday.subtopics.push(elem.curriculumSubtopicNameId);
          break;
        case 5:
          this.friday.subtopics.push(elem.curriculumSubtopicNameId);
          break;
      }
    });
    this.weekDTO.days.push(this.monday, this.tuesday, this.wednesday, this.thursday, this.friday);
  }

  /**This method is triggered when a object is droped into a droppable zone, it will find
   * the currently dragged object and push that object into the a specfic day of a specific week
   * @author Mohamad Alhindi, Carter Taylor, James Holzer, Dylan Britton, Olayinka Patrick
   * @param dayNum
   */
  dropIt(dayNum: number) {
    this.dndService.currentSubtopic.subscribe(
      data => {
        this.weekDTO.days[dayNum].subtopics.push(data);
      }
    ).unsubscribe();
  }

  /**
   * This allows for subtopics to be dragged between days on the same week as well as
   * between days of diffrent weeks
   * @author Mohamad Alhindi, Carter Taylor, James Holzer, Dylan Britton, Olayinka Patrick
   * @param subtopic
   * @param dayNum
   */
  pickItUp(subtopic, dayNum: number) {
    this.dndService.sendSubtopic(subtopic);
  }

  /**
   * When an event is done being dragged the original object is deleted to prevent duplicate
   * object in the array
   * @author Mohamad Alhindi, Carter Taylor, James Holzer, Dylan Britton, Olayinka Patrick
   * @param subtopic
   * @param dayNum
   */
  putItDown(subtopic, dayNum: number) {
    const index = this.weekDTO.days[dayNum].subtopics.indexOf(subtopic);
    this.weekDTO.days[dayNum].subtopics.splice(index, 1);
  }

  /**
   * Drag function for drag/drop functionality.
   */

  draggedFinder(currentlyDragged) {
    this.currentlyDragged = currentlyDragged;
  }
/**
 *
 * @param weekNum
 * Sends specific weekNum of a CurriculumSuptopic[] to removeWeek, for removal.
 * Also, uses stopPropagation because button is on top of clickable div.
 */

 confirmWeekDeletion(weekNum: number) {
    event.stopPropagation();
    this.weekNum = weekNum;
 }

  removeWeekCall() {
    event.stopPropagation();
    this.removeWeekEvent.emit(this.weekNum - 1);
  }

  /**
   * Adds ability to individually remove subtopics from days
   * @author Carter Taylor(1712-Steve)
   * @param subtopic subtopic object that will be removed
   * @param dayNum index of day for weekDTO.days array
   */
  removeSubtopic(subtopic, dayNum) {
    this.weekDTO.days[dayNum].subtopics =
      this.weekDTO.days[dayNum].subtopics.filter(e => e !== subtopic);
  }

}

