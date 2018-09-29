import { CreateVersionComponent } from '../../routes/curriculum-editor/create-version/create-version.component';
import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../../services/curriculum.service';
import { Curriculum } from '../../models/curriculum';
import { Topic } from '../../models/topic';
import { SubTopic } from '../../models/subtopic';
import { TopicService } from '../../services/topic.service';
import { MatDialog } from '@angular/material';
import { SubTopicService } from '../../services/subtopic.service';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';


@Component({
  selector: 'app-curriculum-editor',
  templateUrl: './curriculum-editor.component.html',
  styleUrls: ['./curriculum-editor.scss']
})
export class CurriculumEditorComponent implements OnInit {
  // Arrays of all the elements we're fetching from the server.
  curriculums: Curriculum[] = [];
  curriculumNames: string[] = [];
  topics: Topic[] = [];
  subtopics: SubTopic[] = [];
  selectedCurriculum: Curriculum;
  /*
   * This object will serve a dictionary, and store a
   * set of boolean variables for
   * all of the topics shown, so we can keep track of
   * whether or not a topic is expanded, as well as
   * programatically expand a topic panel.
   * Since it's empty, all the topics are not expanded (as
   * undefined === true is false)
   */
  topicExpansions: Object = {};
  // Binding the subtopic search
  topicSearch = '';

  /**
   * @param curriculumService - The service (defined by us)
   * that we're using to fetch all the curriculums from a server.
   * @param subtopicService - The service (defined by us) that
   * we're using to fetch all the subtopics.
   * @param topicService - The service (defined by us) that
   * we're using to fetch all topics.
   * @param dialog - The dialog is injected into our component so
   * that we can use the modals.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  constructor(
    private curriculumService: CurriculumService,
    private subtopicService: SubTopicService,
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  getAllSubtopics (): void {
    this.subtopicService.getAll().subscribe(subtopics => {
      this.subtopics = subtopics;
    });
  }

  /**
   * Gets us distinct curriculum names from the list of all
   * curriculums
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
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
   * Selects the passed in curriculum to be injected into the curriculum view component.
   * @param curriculum the curriculum you want to display in the curriculum view component.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  selectCurriculum(curriculum: Curriculum) {
    this.selectedCurriculum = curriculum;
  }

  /**
   * Gets all of the subtopics that have the parent id that matches
   * the id of a particular topic.
   * @param topic - the parent topic of the subtopics that we seek
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  getSubtopicsByTopic (topic: Topic): SubTopic[] {
    return this.subtopics.filter(
      (subtopic) => subtopic && subtopic.parentTopicId === topic.id);
  }
  /**
   * When we invoke this function, it opens up the modal that we use
   * to create new curriculum.
   * @author - Chinedu Ozodi | 1806-Sep-18-USF-Java | Steven Kelsey
   */
  createNewCurriculumDialog(): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    const dialogRef = this.dialog.open(CreateCurriculumComponent,
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
   * When we invoke this function, it opens up the modal that we use
   * to create new versions of a curriculum.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  deactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.deactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
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
      }
    );
  }
  /**
   * Calls the reactivate function from the curriculum
   * service.
   * @param curriculum - The curriculum to be reactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  reactivateCurriculum(curriculum: Curriculum): void {
    this.curriculumService.reactivate(curriculum).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
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
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  deactivateTopic(topic: Topic): void {
    this.topicService.deactivate(topic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
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
      }
    );
    this.collapseTopic(topic.id);
  }
  /**
   * Calls the reactivate function from the topic
   * service.
   * collapseTopic is called because we don't want
   * the reactivation to automatically expand a panel,
   * or if the button is clicked.
   * @param topic - The topic to be reactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  reactivateTopic(topic: Topic): void {
    this.topicService.reactivate(topic).subscribe(
      data => {
        this.collapseTopic(topic.id);
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
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
      }
    );
    this.collapseTopic(topic.id);
  }
  /*
   * collapseTopic, expandTopic, and isExpanded are functions
   * used to check and control the expansion of a topic panel
   * (binded to and displayed in the HTML template)
   */
  /**
   * Sets the value to true for a dictionary key with
   * the given topic id.
   * @param topicId - the id of the topic we want
   * to expand
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  expandTopic(topicId: number): void {
    this.topicExpansions[`topic_${topicId}`] = true;
  }
  /**
   * Sets the value to false for a dictionary key with
   * the given topic id.
   * @param topicId - the id of the topic we want
   * to collapse
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  collapseTopic(topicId: number): void {
    this.topicExpansions[`topic_${topicId}`] = false;
  }
  /**
   * Checks whether or not a topic is expanded. If it
   * value in the dictionary is true, it is expanded,
   * but if the value in the dictionary is false or
   * undefined, it's not expanded.
   * @param topicId - the id of the topic we want to
   * check the expansion of.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  isExpanded(topicId: number): boolean {
    return this.topicExpansions[`topic_${topicId}`] === true;
  }
  /**
   * Calls the deactivate function from the subtopic
   * service.
   * @param subtopic - The subtopic to be deactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  deactivateSubtopic(subtopic: SubTopic): void {
    this.subtopicService.deactivate(subtopic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
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
      }
    );
  }
  /**
   * Calls the reactivate function from the subtopic
   * service.
   * @param subtopic - The subtopic to be reactivated.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  reactivateSubtopic(subtopic: SubTopic): void {
    this.subtopicService.reactivate(subtopic).subscribe(
      data => {
        if (data['name'] === undefined || data['name'] === null) {
          return;
        }
        /*
         * After we reactivate on the server, we also want to
         * reactivate from the client-side array binded to our
         * template (so the user immediately sees that it's
         * reactivated)
         */
        subtopic.name = this.subtopicService.reactivateName(
          subtopic.name
        );
      },
      err => {
      }
    );
  }

  /**
   * When we invoke this function, it opens
   * up the modal that we use to create new
   * subtopics for a topic. This time, for
   * a DialogViewComponent, for adding subtopic
   * to topic.
   * @author - Karen Matney | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  openNewDialog(): void {
    /*
     * this.dialog is an injected dependency for the modal
     * The open method passes in a component that we'll use
     * in the modal.
     */
    const dialogRef = this.dialog.open(DialogViewComponent,
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
        topics: this.topics,
        subtopics: this.subtopics,
        topicService: this.topicService,
        subtopicService: this.subtopicService
      }
    });
  }

  /**
   * Checks whether or not a word begins with a sequence of characters
   * A string with multiple words can be inputted into the function,
   * but in this appplication, this helper function is not invoked
   * with a string of multiple words.
   * @param searchString - the sequence of characters (generally
   * received from a user input)
   * @param targetString - a one-word string that we'll be checking
   * the start sequence of.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  wordBeginsWith(searchString: string, targetString: string): boolean {
    return targetString.toLowerCase().substring(0,
      searchString.length) === searchString.toLowerCase();
  }

  /**
   * Checks wether or not a sequence of words (user input) is a
   * subsequence of another sequence of words (topic name or
   * subtopic)
   * @param searchString - user input used as the search sequence
   * @param targetString - topic/subtopic name that we'll check
   * to see if it contains a particular subsequence.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  hasSequence(searchString: string, targetString: string): boolean {
    // There shouldn't be too many spaces in the search.
    searchString = searchString.trim();
    /*
     * Adds a ' ' to both the beginning and the end of the
     * sequence of words, to make sure we're searching for
     * full words. 'e ja' is a substring of 'core java',
     * ' e ja ' doesn't exist in ' core java '.
     */
    /*
     * The lowercasing is just for case insensitivity.
     * It doesn't change the string values outside the
     * function.
     */
    searchString = ` ${searchString} `;
    searchString = searchString.toLowerCase();
    targetString = ` ${targetString} `;
    targetString = targetString.toLowerCase();
    return targetString.indexOf(searchString) >= 0;
  }

  /**
   * Determines whether or a string (topic/subtopic name
   * in our application) has a word that starts with a
   * particular search input. If the search input is
   * multiple words, it checks whether or not the
   * string (as a sequence of words) has a subsequence
   * of that particular.
   * @param searchString - the user's input for a search sequence
   * @param targetString - the topic/subtopic name that we will
   * use check if it's in our search criteria.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  inSearch(searchString: string, targetString: string) {
    let wordsString: string[] = targetString.split(' ');
    wordsString = wordsString.filter((word) => {
      return this.wordBeginsWith(searchString, word);
    });
    return wordsString.length > 0 || this.hasSequence(searchString, targetString);
  }

  /**
   * Filters out the list of subtopics so that only the subtopics (with
   * a name matching a search criteria) would show.
   * @param search - the user input that will determine the criteria
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  searchSubtopics(search: string): SubTopic[] {
    return this.subtopics.filter((subtopic) => this.inSearch(search, subtopic.name));
  }

  /**
   * Checks to see if the topic has a subtopic that
   * matching a search criteria.
   * @param search - The user input
   * @param topic - The topic that we're checking.
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  hasTopic(search: string, topic: Topic): boolean {
    let subtopics: SubTopic[] = this.searchSubtopics(search);
    subtopics = subtopics.filter((subtopic) => subtopic.parentTopicId
      === topic.id);
    return subtopics.length > 0;
  }

  /**
   * Filters out the list of topics so that only the topics (with
   * a name matching a search criteria) would show.
   * @param search - the user input that will determine the criteria
   * @author - Andrew Li | 1806-Jun-18-USF-Java | Wezley Singleton
   */
  searchTopics(search: string): Topic[] {
    return this.topics.filter((topic) => this.hasTopic(search, topic)
      || this.inSearch(search, topic.name));
  }
}
