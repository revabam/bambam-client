import { CurriculumWeek } from './../../../models/curriculum-week';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Allows user to a curriculums week.
 */
@Component({
  selector: 'app-curriculum-week',
  templateUrl: './curriculum-week.component.html',
  styleUrls: ['./curriculum-week.component.css']
})
export class CurriculumWeekComponent implements OnInit {

  @Input()
  week: CurriculumWeek;
  constructor() { }

  ngOnInit() {
  }

}
