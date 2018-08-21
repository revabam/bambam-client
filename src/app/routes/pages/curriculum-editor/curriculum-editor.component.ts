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
  // Arrays of all the elements we're fetching from the server.
  curriculums: Curriculum[] = [];
  curriculumNames: string[] = [];
  topics: Topic[] = [];
  subtopics: Subtopic[] = [];
  /*
   * This object will store a set of boolean variables for
   * all of the topics shown, so we can keep track of
   * whether or not a topic is expanded, as well as
   * programaticallyexpand a topic panel (the [expanded]
   * attribute will be binded to the booleans in this object).
   * Since it's empty, all the topics are not expanded (as
   * undefined === true is false)
   */
  topicExpansions: Object = {};

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
    let names: string[] = this.curriculums.map(curr => curr.name);
    // If it is deactivated, then we don't create a
    // separate unique name for that.
    names = names.map((name) => this.curriculumService.reactivateName(name));
    return names.filter((name, i, arr) => name && arr.indexOf(name) === i);
  }

  /**
   * Gets us all of the curriculums that have a certain name.
   * Also, orders it from highest version to lowest version.
   * It also looks for deactivated versions with that name.
   * @param name - the name of the curricula that we seek.
   */
  getCurriculumsByName (name: string): Curriculum[] {
    const curriculumsWithName: Curriculum[] = this.curriculums.filter(
      (curriculum) => curriculum && (curriculum.name === name
        || this.curriculumService.reactivateName(curriculum.name)
        === name));
    // Ordering from highest version to lowest version
    curriculumsWithName.sort(function(makeBigger: Curriculum,
      makeSmaller: Curriculum): number {
      return makeSmaller.version - makeBigger.version;
    });
    return curriculumsWithName;
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
     * We need to allow the child component to access the
     * getCurriculumsByName so that the child component can get
     * the highest version number and increment by one.
     */
      {
        width: '600px',
        data: {
          curriculums: this.curriculums,
          curriculumNames: this.curriculumNames,
          topics: this.topics,
          curriculumService: this.curriculumService,
          getCurriculumsByName: this.getCurriculumsByName
        }
      }
    );
  }
  /**
   * Calls the deactivate function from the curriculum
   * service.
   * @param curriculum - The curriculum to be deactivated.
   */
  deactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.deactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to deactivate curriculum');
          return;
        }
        console.log('Successfully deactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        curriculum.name = this.curriculumService.deactivateName(
          curriculum.name
        );
      },
      err => {
        console.log('Failed to deactivate a curriculum');
      }
    );
  }
  /**
   * Calls the deactivate function from the curriculum
   * service.
   * @param curriculum - The curriculum to be deactivated.
   */
  reactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.reactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to reactivate curriculum');
          return;
        }
        console.log('Successfully reactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        curriculum.name = this.curriculumService.reactivateName(
          curriculum.name
        );
      },
      err => {
        console.log('Failed to reactivate a curriculum');
      }
    );
  }
  /**
   * Calls the deactivate function from the topic
   * service.
   * this.collapseTopic is called because we want
   * the panel to be collapsed if the deactivate
   * button is clicked.
   * @param topic - The topic to be deactivated.
   */
  deactivateTopic(topic: Topic): void {
    this.topicService.deactivate(topic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to deactivate topic');
          return;
        }
        console.log('Successfully deactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        topic.name = this.topicService.deactivateName(
          topic.name
        );
      },
      err => {
        console.log('Failed to deactivate a topic');
      }
    );
    this.collapseTopic(topic.id);
  }
  /**
   * Calls the deactivate function from the topic
   * service.
   * collapseTopic is called because we don't want
   * the reactivation to automatically expand a panel,
   * or if the button is clicked.
   * @param topic - The topic to be deactivated.
   */
  reactivateTopic(topic: Topic): void {
    this.topicService.reactivate(topic).subscribe(
      data => {
        this.collapseTopic(topic.id);
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to reactivate topic');
          return;
        }
        console.log('Successfully reactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        topic.name = this.topicService.reactivateName(
          topic.name
        );
      },
      err => {
        console.log('Failed to reactivate a topic');
      }
    );
    this.collapseTopic(topic.id);
  }
  /*
   * topic_{id} will be unique for each topic.
   * It's initialized as undefined, but expansion
   * will define it as true.
   */
  expandTopic(topicId: number): void {
    this.topicExpansions[`topic_${topicId}`] = true;
  }
  collapseTopic(topicId: number): void {
    this.topicExpansions[`topic_${topicId}`] = false;
  }
  isExpanded(topicId: number): boolean {
    return this.topicExpansions[`topic_${topicId}`] === true;
  }
  /**
   * Calls the deactivate function from the subtopic
   * service.
   * @param subtopic - The subtopic to be deactivated.
   */
  deactivateSubtopic(subtopic: Subtopic): void {
    this.subtopicService.deactivate(subtopic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to deactivate subtopic');
          return;
        }
        console.log('Successfully deactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        subtopic.name = this.subtopicService.deactivateName(
          subtopic.name
        );
      },
      err => {
        console.log('Failed to deactivate a subtopic');
      }
    );
  }
  /**
   * Calls the deactivate function from the subtopic
   * service.
   * @param subtopic - The subtopic to be deactivated.
   */
  reactivateSubtopic(subtopic: Subtopic): void {
    this.subtopicService.reactivate(subtopic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          console.log('Failed to reactivate subtopic');
          return;
        }
        console.log('Successfully reactivated ', data);
        /*
         * After we deactivate from the server, we also want to
         * deactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * deactivated)
         */
        subtopic.name = this.subtopicService.reactivateName(
          subtopic.name
        );
      },
      err => {
        console.log('Failed to reactivate a subtopic');
      }
    );
  }
}
