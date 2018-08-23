import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TopicService } from '../../../services/topic.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { Topic } from '../../../models/topic';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {
  topicName: string;
  subtopicName: string;
  fieldVisible = false;
  subtopics: string[] = [];
  dropDownTopics: Topic[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object, private topicService: TopicService) { }

  ngOnInit() {
    this.topicService.getAll().subscribe(response => {
      this.dropDownTopics = response;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  addTopic(): void {
    console.log('[DEBUG] - in addTopic');
    console.log(`${this.topicName} - ${this.subtopicName}`);

    if (this.topicName !== this.data['topicService'].reactivateName(this.topicName)) {
      alert('Invalid Topic Name');
      return;
    }

    this.data['topicService'].getAll().subscribe(topics => {
      topics = topics.filter((topic) => this.topicName.toUpperCase()
        === this.data['topicService'].reactivateName(
          topic.name).toUpperCase());
      console.log('[DEBUG] - topic already exist, topic is: ');
      console.log(topics);
      if (topics.length === 0) {
        this.data['topicService'].add(this.topicName).subscribe(result => {
          console.log('[DEBUG] - result: ');
          console.log(result);
          this.data['topics'].push(result);
          this.subtopics.forEach(subtopic => this.data['subtopicService'].add(subtopic, result.id).subscribe(addedSubtopic => {
            this.data['subtopics'].push(addedSubtopic);
          }));
        });
      } else {
        console.log(`${topics[0].id}`);
        this.subtopics.forEach(subtopic => this.data['subtopicService'].add(subtopic, topics[0].id).subscribe(
          (addedSubtopic) => this.data['subtopics'].push(addedSubtopic)
        ));
      }
      this.dialogRef.close();
    });
  }

  makefieldVisible() {
    this.fieldVisible = true;
  }

  addToSubTopics(): void {
    if (this.subtopicName !== this.data['subtopicService'].reactivateName(this.subtopicName)) {
      alert('Invalid Subtopic Name');
      return;
    }
    this.subtopics.push(this.subtopicName);
    this.subtopics.forEach(item => console.log(item));
  }

}
