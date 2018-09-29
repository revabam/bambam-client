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
  constructor() { }

  ngOnInit() {
  }

}
