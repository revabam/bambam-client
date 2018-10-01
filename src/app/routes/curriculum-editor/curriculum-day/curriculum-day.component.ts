import { CurriculumDay } from './../../../models/curriculum-day';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curriculum-day',
  templateUrl: './curriculum-day.component.html',
  styleUrls: ['./curriculum-day.scss']
})
export class CurriculumDayComponent implements OnInit {

  @Input()
  day: CurriculumDay;

  constructor() { }

  ngOnInit() {
  }

}
