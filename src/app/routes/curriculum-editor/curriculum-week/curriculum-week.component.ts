import { CurriculumDay } from './../../../models/curriculum-day';
import { CurriculumWeek } from './../../../models/curriculum-week';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-curriculum-week',
  templateUrl: './curriculum-week.component.html',
  styleUrls: ['./curriculum-week.component.css']
})
export class CurriculumWeekComponent implements OnInit {

  @Input() week: CurriculumWeek;
  @Output() weekChange: EventEmitter<CurriculumWeek> = new EventEmitter<CurriculumWeek>();
  constructor() { }

  ngOnInit() {
  }

  onDayChange(event: CurriculumDay) {
    console.log('dayChanged');
    console.log(event);
    const index = this.week.curriculumDays.findIndex( x => x.dayNum === event.dayNum);
    this.week.curriculumDays[index] = event;
    this.weekChange.emit(this.week);
  }

}
