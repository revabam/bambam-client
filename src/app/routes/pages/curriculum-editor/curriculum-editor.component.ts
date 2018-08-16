import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';
import { Topic } from '../../../models/topic';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-curriculum-editor',
  templateUrl: './curriculum-editor.component.html',
  styleUrls: ['./curriculum-editor.component.css']
})
export class CurriculumEditorComponent implements OnInit {
  curriculums: Curriculum[] = [];
  curriculumNames: string[];
  selectedTopics: Topic[] = [];
  topics: Topic[] = [];
  selectedName: string;

  constructor(
    private curriculumService: CurriculumService,
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.getAllCurriculums();
  }

  getAllCurriculums(): void {
    this.curriculumService.getAll().subscribe(curriculums => {
      this.curriculums = curriculums;
      this.curriculumNames = this.getUniqueNames();
    });
  }

  getAllTopics(): void {
    this.topicService.getAll().subscribe(topics => {
      this.topics = topics;
    });
  }

  getUniqueNames(): string[] {
    const names = this.curriculums.map(curr => curr.name);
    return names.filter((x, i, a) => x && a.indexOf(x) === i);
  }

  getCurriculumsByName(name: string): Curriculum[] {
    const curriculumsWithName: Curriculum[] = [];
    for (let i = 0; i < this.curriculums.length; i++) {
      if (this.curriculums[i].name === name) {
        curriculumsWithName.push(this.curriculums[i]);
      }
    }
    this.selectedName = name;
    return curriculumsWithName;
  }

  getTopicsByCurriculums(name: string): Topic[] {
    let topics: Topic[] = [];
    const currs: Curriculum[] = this.getCurriculumsByName(name);
    for (let i = 0; i < currs.length; i++) {
      console.log(topics);
      console.log(currs[i].topics);
      topics = topics.concat(currs[i].topics);
      console.log(topics);
      if (topics.length > 0) {
        console.log(typeof(topics[0]));
      }
    }
    const uniqueTopics = topics.map(topic => topic);
    return uniqueTopics.filter((x, i, a) => x && a.indexOf(x) === i);
  }

  filterTopics(topicsList: Topic[]): void {
    for (let i = 0; i < topicsList.length; i++) {}
  }

}
