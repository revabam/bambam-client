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

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,
    private topicService: TopicService,
    private subtopicService: SubtopicService) {}

    close(): void {
      this.dialogRef.close();
    }

  addTopic(): void {
    console.log(`${this.topicName} - ${this.subtopicName}`);

    this.topicService.getByName(this.topicName).subscribe(topic => {
      if (topic === null) {
        this.topicService.add(this.topicName).subscribe(result =>
          this.subtopicService.add(this.subtopicName, result.id).subscribe(_ =>
            this.dialogRef.close()
          ));
      } else {
        console.log(`${topic.id}`);
        this.subtopicService.add(this.subtopicName, topic.id).subscribe(_ =>
        this.dialogRef.close());
      }
      this.dialogRef.close();
    });
  }

}
