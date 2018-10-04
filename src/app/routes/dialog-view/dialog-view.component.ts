import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TopicService } from '../../services/topic.service';
import { SubTopicService } from '../../services/subtopic.service';
import { Topic } from '../../models/topic';

/**
 * Component created to inject a dialog view whenever adding Topics or Sub-Topics in the
 * Curriculum editor.
 * Need to convert services from a field in data to be injected into the constructor.
 * @author Karen Matney | Khaleel Williams | Andrew Li | 1806-Jun18-USF-Java | Wezley Singleton
*/
@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  topicName: string;
  subtopicName: string;
  // Switches visibility of Sub-topic input field
  fieldVisible = false;
  // List of subtopic to be added
  subtopics: string[] = [];
  // List of all available topics to be selected whenever adding a new sub-topic.
  dropDownTopics: Topic[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object, private topicService: TopicService) { }

  ngOnInit() {
    this.topicService.getAll().subscribe(response => {
      this.dropDownTopics = response;
    });
  }

  /**
   * Exits dialog view whenver cancel or ok is hit in the dialog view.
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Adds user created topics from the input fields provided by the dialog view.
   * @author Karen Matney | Khaleel Williams
   */
  addTopic(): void {
    if (this.topicName !== this.data['topicService'].reactivateName(this.topicName)) {
      alert('Invalid Topic Name');
      return;
    }

    this.data['topicService'].getAll().subscribe(topics => {
      topics = topics.filter((topic) => this.topicName.toUpperCase()
        === this.data['topicService'].reactivateName(
          topic.name).toUpperCase());
      if (topics.length === 0) {
        this.data['topicService'].add(this.topicName).subscribe(result => {
          this.data['topics'].push(result);
          this.subtopics.forEach(subtopic => this.data['subtopicService'].add(subtopic, result.id).subscribe(addedSubtopic => {
            this.data['subtopics'].push(addedSubtopic);
          }));
        });
      } else {
        this.subtopics.forEach(subtopic => this.data['subtopicService'].add(subtopic, topics[0].id).subscribe(
          (addedSubtopic) => {
            this.data['subtopics'].push(addedSubtopic);
        }));
      }
      this.dialogRef.close();
    });
  }

  /**
   * Makes Sub-Topic input field visible when pressing the addition button.
   * @author Karen Matney
   */
  makefieldVisible() {
    this.fieldVisible = true;
  }

  /**
   * Adds a list of Sub-Topics to a topic.
   * @author Karen Matney
   */
  addToSubTopics(): void {
    if (this.subtopicName !== this.data['subtopicService'].reactivateName(this.subtopicName)) {
      alert('Invalid Subtopic Name');
      return;
    }
    this.subtopics.push(this.subtopicName);
  }

}
