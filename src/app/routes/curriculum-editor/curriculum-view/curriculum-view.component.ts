import { CurriculumWeek } from './../../../models/curriculum-week';
import { Curriculum } from './../../../models/curriculum';
import { Component, OnInit, Input } from '@angular/core';
import { CurriculumWeekService } from '../../../services/curriculum-week.service';

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.scss']
})
export class CurriculumViewComponent implements OnInit {

  @Input()
  curriculum: Curriculum;
  constructor(
    private curriculumWeekService: CurriculumWeekService
  ) { }

  ngOnInit() {
  }

   /**
   * updates weeks when changed
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  onWeekChange(event: CurriculumWeek) {
    const index = this.curriculum.curriculumWeeks.findIndex( x => x.weekNum === event.weekNum);
    this.curriculum.curriculumWeeks[index] = event;
    this.curriculumWeekService.put(event).subscribe( () => {
    });
  }
}
