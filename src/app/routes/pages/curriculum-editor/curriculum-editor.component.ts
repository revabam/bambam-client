import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';
import { Topic } from '../../../models/topic';
import { Subtopic } from '../../../models/subtopic';
import { TopicService } from '../../../services/topic.service';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { CreateVersionComponent } from '../create-version/create-version.component';
import { SubtopicService } from '../../../services/subtopic.service';

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
  subtopics: Subtopic[] = [];
  selectedName: string;

  constructor(
    private curriculumService: CurriculumService,
    private subtopicService: SubtopicService,
    private topicService: TopicService,
    public dialog: MatDialog
  ) { }

  ngOnInit () {
    this.getAllCurriculums();
    this.getAllTopics();
    this.getAllSubtopics();
  }

  getAllCurriculums (): void {
    this.curriculumService.getAll().subscribe(curriculums => {
      this.curriculums = curriculums;
      this.curriculumNames = this.getUniqueNames();
    });
  }

  getAllTopics (): void {
    this.topicService.getAll().subscribe(topics => {
      this.topics = topics;
    });
  }

  getAllSubtopics (): void {
    this.subtopicService.getAll().subscribe(subtopics => {
      this.subtopics = subtopics;
    });
  }

  getUniqueNames (): string[] {
    const names: string[] = this.curriculums.map(curr => curr.name);
    return names.filter((name, i, arr) => name && arr.indexOf(name) === i);
  }

  getCurriculumsByName (name: string): Curriculum[] {
    this.selectedName = name;
    return this.curriculums.filter(
      (curriculum) => curriculum && curriculum.name === name);
  }

  getSubtopicsByTopic (topic: Topic): Subtopic[] {
    return this.subtopics.filter(
      (subtopic) => subtopic && subtopic.parentTopic_id === topic.id);
  }

  getTopicsByCurriculums (name: string): Topic[] {
    let topics: Topic[] = [];
    const currs: Curriculum[] = this.getCurriculumsByName(name);
    for (let i = 0; i < currs.length; i++) {
      topics = topics.concat(currs[i].topics);
    }
    // Filter the topics to remove duplicates
    const uniqueTopics = topics.map(topic => topic);
    const returnedTopics = uniqueTopics.filter((x, i, a) => x && a.indexOf(x) === i);
    // Convert array of ID's (integers) to array of Topic objects
    this.convertTopics(returnedTopics);
    return returnedTopics;
  }

  convertTopics (topicsList: Topic[]): void {
    for (let i = 0; i < topicsList.length; i++) {
      if (typeof (topicsList[i]) === 'number') {
        const idConv: any = topicsList[i];
        const id: number = idConv;
        for (let j = 0; j < this.topics.length; j++) {
          if (id === this.topics[j].id) {
            topicsList[i] = this.topics[j];
          }
        }
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateVersionComponent,
      {
        width: '600px',
        data: {
          curriculums: this.curriculums,
          curriculumNames: this.curriculumNames,
          topics: this.topics,
          curriculumService: this.curriculumService
        }
      }
    );
  }
  deleteCurriculum(curriculum: Curriculum): void {
    this.curriculumService.delete(curriculum).subscribe(
      data => {
        console.log('Successfully deleted ', curriculum);
      },
      err => {
        console.log('Failed to delete a curriculum');
      }
    );
    for (let i = 0; i < this.curriculums.length; i++) {
      if (this.curriculums[i] === curriculum) {
        this.curriculums.splice(i, 1);
      }
    }
  }
}
