import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';
import { Topic } from '../../../models/topic';
import { Subtopic } from '../../../models/subtopic';
import { TopicService } from '../../../services/topic.service';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { CreateVersionComponent } from '../create-version/create-version.component';
import { SubtopicService } from '../../../services/subtopic.service';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';


@Component({
  selector: 'app-curriculum-editor',
  templateUrl: './curriculum-editor.component.html',
  styleUrls: ['./curriculum-editor.component.css']
})
export class CurriculumEditorComponent implements OnInit {
  // Arrays of all the elements we're fetching from the server.
  curriculums: Curriculum[] = [];
  curriculumNames: string[] = [];
  topics: Topic[] = [];
  subtopics: Subtopic[] = [];

  /**
   * @param curriculumService - The service (defined by us)
   * that we're using to fetch all the curriculums from a server.
   * @param subtopicService - The service (defined by us) that
   * we're using to fetch all the subtopics.
   * @param topicService - The service (defined by us) that
   * we're using to fetch all topics.
   * @param dialog - The dialog is injected into our component so
   * that we can use the modals.
   */
  constructor(
    private curriculumService: CurriculumService,
    private subtopicService: SubtopicService,
    private topicService: TopicService,
    public dialog: MatDialog
  ) { }

  /*
   * We're invoking our services' fetch statements so
   * that we can display our data on our page.
   */
  ngOnInit () {
    this.getAllCurriculums();
    this.getAllTopics();
    this.getAllSubtopics();
  }

  /**
   * Grabs all of the curriculums from the database.
   * Subscribe is what enables us to get the actual object
   * from the Observable returned by the service.
   */
  getAllCurriculums (): void {
    this.curriculumService.getAll().subscribe(curriculums => {
      this.curriculums = curriculums;
      this.curriculumNames = this.getUniqueNames();
    });
  }

  /**
   * Grabs all of the topics from the database.
   * Subscribe is what enables us to get the actual object
   * from the Observable returned by the service.
   */
  getAllTopics (): void {
    this.topicService.getAll().subscribe(topics => {
      this.topics = topics;
    });
  }

  /**
   * Grabs all of the subtopics from the database.
   * Subscribe is what enables us to get the actual object
   * from the Observable returned by the service.
   */
  getAllSubtopics (): void {
    this.subtopicService.getAll().subscribe(subtopics => {
      this.subtopics = subtopics;
    });
  }

  /**
   * Gets us distinct curriculum names from the list of all
   * curriculums
   */
  getUniqueNames (): string[] {
    const names: string[] = this.curriculums.map(curr => curr.name);
    return names.filter((name, i, arr) => name && arr.indexOf(name) === i);
  }

  /**
   * Gets us all of the curriculums that have a certain name
   * @param name - the name of the curricula that we seek.
   */
  getCurriculumsByName (name: string): Curriculum[] {
    return this.curriculums.filter(
      (curriculum) => curriculum && curriculum.name === name);
  }

  /**
   * Gets all of the subtopics that have the parent id that matches
   * the id of a particular topic.
   * @param topic - the parent topic of the subtopics that we seek
   */
  getSubtopicsByTopic (topic: Topic): Subtopic[] {
    return this.subtopics.filter(
      (subtopic) => subtopic && subtopic.parentTopic_id === topic.id);
  }

  /**
   * When we invoke this function, it opens up the modal that we use
   * to create new versions of a curriculum.
   */
  openDialog(): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    const dialogRef = this.dialog.open(CreateVersionComponent,
     /*
     * An object is passed in as the second parameter, which
     * defines properties of the dialog modal, as well as the
     * data that we'll pass in for the modal component to access.
     */
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
  /**
   * Calls the delete function from the curriculum service.
   * @param curriculum - The curriculum to be deleted.
   */
  deleteCurriculum(curriculum: Curriculum): void {
    this.curriculumService.delete(curriculum).subscribe(
      data => {
        console.log('Successfully deleted ', curriculum);
        /*
         * After we delete from the server, we also want to delete
         * from the client-side array binded to our template (so
         * the user immediately sees that it's deleted)
         */
        this.curriculums = this.curriculums.filter((remaining) =>
          remaining !== curriculum);
      },
      err => {
        console.log('Failed to delete a curriculum');
      }
    );
  }

  openNewDialog(): void {
    console.log('In openNewDialog()');
    const dialogRef = this.dialog.open(DialogViewComponent,

      {
        width: '600px'
      }
    );
  }
}
