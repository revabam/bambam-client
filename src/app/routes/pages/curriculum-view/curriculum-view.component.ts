import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.component.css']
})
export class CurriculumViewComponent implements OnInit {
  curriculums: Curriculum[];

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit() {
  }
}
