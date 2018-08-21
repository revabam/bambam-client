import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TopicService } from '../../../services/topic.service';
import { SubtopicService } from '../../../services/subtopic.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent {
  topicName: string;
  subtopicName: string;
  fieldVisible = false;
  subtopics: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,
    private topicService: TopicService,
    private subtopicService: SubtopicService) {}

    close(): void {
      this.dialogRef.close();
    }

  addTopic(): void {
    console.log('[DEBUG] - in addTopic');
    console.log(`${this.topicName} - ${this.subtopicName}`);

    this.topicService.getByName(this.topicName).subscribe(topics => {
      console.log('[DEBUG] - topic already exist, topic is: ');
      console.log(topics);
      if (topics.length === 0) {
        this.topicService.add(this.topicName).subscribe(result => {
          console.log('[DEBUG] - result: ');
          console.log(result);
          this.subtopics.forEach(subtopic => this.subtopicService.add(subtopic, result.id).subscribe());
        });
      } else {
        console.log(`${topics[0].id}`);
        this.subtopics.forEach(subtopic => this.subtopicService.add(subtopic, topics[0].id).subscribe());
      }
      this.dialogRef.close();
    });
  }

  makefieldVisible() {
    this.fieldVisible = true;
  }

  addToSubTopics(): void {
    this.subtopics.push(this.subtopicName);
    this.subtopics.forEach(item => console.log(item));
  }

}
