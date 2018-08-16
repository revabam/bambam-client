import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';

@Component({
  selector: 'app-curriculum-editor',
  templateUrl: './curriculum-editor.component.html',
  styleUrls: ['./curriculum-editor.component.css']
})
export class CurriculumEditorComponent implements OnInit {
  curriculums: Curriculum[] = [];
  curriculumNames: string[];

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit() {
    this.getAllCurriculums();
  }

  getAllCurriculums(): void {
    this.curriculumService.getAll().subscribe(curriculums => {
      this.curriculums = curriculums;
      this.curriculumNames = this.getUniqueNames();
    });
  }

  getUniqueNames(): string[] {
    const names = this.curriculums.map(curr => curr.name);
    return names.filter((x, i, a) => x && a.indexOf(x) === i);
  }

}
