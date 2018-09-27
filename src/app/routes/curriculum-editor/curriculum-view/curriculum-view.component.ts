import { CurriculumService } from './../../../services/curriculum.service';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { Curriculum } from './../../../models/curriculum';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.component.css']
})
export class CurriculumViewComponent implements OnInit {

  @Input()
  curriculum: Curriculum;
  constructor(
    private curriculumService: CurriculumService
  ) { }

  ngOnInit() {
  }

  onWeekChange(event: CurriculumWeek) {
    const index = this.curriculum.curriculumWeeks.findIndex( x => x.weekNum === event.weekNum);
    this.curriculum.curriculumWeeks[index] = event;
    this.curriculumService.put(this.curriculum).subscribe(
      () => {
        console.log('curriculum updated');
      }
    );
    console.log(JSON.stringify(this.curriculum));
  }

}
