import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TopicName } from '../../../models/topicname.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { CurriculumService } from '../../../services/curriculum.service';
import { ViewChild } from '@angular/core/src/metadata/di';
import { CurriculumWeekComponent } from '../curriculum-week/curriculum-week.component';
import { DragndropService } from '../../../services/dragndrop.service';
import { TopicService } from '../../../services/topic.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { SearchTextService } from '../../../services/search-text.service';
import { AlertService } from '../../../services/alert.service';
import { Topic } from '../../../models/topic.model';
import { SubtopicCurric } from '../../../models/subtopicCurric.model';

// Used below to toggle add subtopic modal
declare let $: any;

@Component({
  selector: 'app-topic-pool',
  templateUrl: './topic-pool.component.html',
  styleUrls: ['./topic-pool.component.css']
})

export class TopicPoolComponent implements OnInit {
  topics: string[] = [];
  uniqarr: string[];
  uniqarrFiltered: string[];
  searchText: string;
  subArray: Array<Topic[]> = new Array<Topic[]>();
  subTopicArray: Array<SubtopicCurric[]> = new Array<SubtopicCurric[]>();
  subTopicName: Topic[] = [];
  topicPoolCacheData: Topic[] = [];
  @Input() readOnly: boolean;
  selectedTopicId: number;

  constructor(private curriculumService: CurriculumService,
    public curriculumWeekComponent: CurriculumWeekComponent,
    private dndService: DragndropService,
    private searchTextService: SearchTextService,
    private topicService: TopicService,
    private subtopicService: SubtopicService,
    private alertService: AlertService
  ) { }

  @Output() currentlyDragged = new EventEmitter();

  /**  On initializing this component we are calling the getTopic() function
   *   @author: Mohamad Alhindi
   *   @batch: 1712-Dec11-2017
   **/
  ngOnInit() {
    this.getTopics();
  }

  /**  This will subscribe to the curriculum service to obtain the topic pool information
   *   @author Mohamad Alhindi
    *  @batch 1712-Dec11-2017
    */
  getTopics() {
    this.curriculumService.currentTopicPoolData.subscribe(
      data => this.topicPoolCacheData = data
    );

    if (this.topicPoolCacheData.length === 0) {
    this.curriculumService.getAllTopicPool().subscribe(
      data => {
        this.subTopicName = data;
        this.initTopics();
        this.uniqueTopics();
        this.getSubTopics();
        this.initFilterTopicListener();
        this.clearTopic();
      },
      err => {
        console.log(err.status);
      }
    );
  }else {
        this.subTopicName = this.topicPoolCacheData;
        this.initTopics();
        this.uniqueTopics();
        this.getSubTopics();
        this.initFilterTopicListener();
    }

  }

    /** Runs throught subTopicNames array and will extract the topics within the array
     *  @author Mohamad Alhindi
     *  @batch 1712-Dec11-2017
     */
  initTopics() {
    for (let i = 0; i < this.subTopicName.length; i++) {
      this.topics.push(this.subTopicName[i].topicName);
    }
  }

  /** This method is used with conjunction of filter to obtain only unique elements of an array
    *  @author Mohamad Alhindi
    *  @param value
    *  @param index
    *  @param self
    *  @batch 1712-Dec11-2017
    */
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  /**  Filters through topics array to filter out repeated topics within the array
   *   @author Mohamad Alhindi
    *  @batch 1712-Dec11-2017
    */
  uniqueTopics() {
    this.uniqarr = this.topics.filter(this.onlyUnique);
    this.uniqarrFiltered = this.uniqarr;
  }

  /**
   *  Filters topics by search term
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   */
  initFilterTopicListener() {
    this.searchTextService.getMessage().subscribe(data => {
      if (data.type === 'topic') {
        const topicSearch = data.text.toString().toLowerCase();
        this.uniqarrFiltered = this.uniqarr.filter(i => {
          return i.toLowerCase().includes(topicSearch.toString());
        });
        this.subArray = new Array<Topic[]>();
        this.getSubTopics();
      } else if (data.type === 'subtopic') {
        this.searchText = data.text.toString().toLowerCase();
      }
    });
  }

  /**
   *  Clear  Subtopics.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   */
  clearSubtopicSearch() {
    this.searchText = '';
    this.searchTextService.sendMessage('', 'clear');
  }
  /**
   * clear topic.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   */
  clearTopic() {
    this.searchTextService.sendMessage('', 'clearTopic');
  }

  /** Uses the unique topics array to obtain the the subtopics that releate to each topic
    * @author Mohamad Alhindi
    * @batch 1712-Dec11-2017
    */
  getSubTopics() {
    // get all subtopics
    this.subtopicService.getAllSubtopics().subscribe(
      arrayOfAllSubtopics => {
        const i = 0;
        this.subTopicName.forEach(topic => {
          this.subTopicArray.push(arrayOfAllSubtopics.filter( match => topic.topicName === match.parentTopic.topicName));
          // if topic name equals subtopic.parentname
          // add it to subtopicarray first index
          // ++i;
          // after that, iterate the index
        });
      }
    );

    // for each in subtopic name

  }

  /**
   * This method is used to send the currently dragged object
   * @author Mohamad Alhindi
   * @param event
   * @param sub
   */
  sendCurrentlyDragged(sub) {
    this.dndService.sendSubtopic(sub);
  }

  /**
   * Create new topic and calling the API end point to add it.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   * @param newTopic to add.
   * @param newSubTopic to add.
   */
  createTopic(newTopic: string, newSubTopic: string) {
    this.topicService.addTopicName(newTopic).subscribe(
      topic => {
        this.subtopicService.addSubTopicName(newSubTopic, topic.id, 1).subscribe(
          data => {
            this.uniqarrFiltered.push(topic.name);
            this.subArray = new Array<Topic[]>();
            this.topicPoolCacheData.push(data);
            this.getSubTopics();
            this.alertService.alert('success', 'Successfully added Topic');
          },
          err => this.alertService.alert('danger', 'Could not add topic')
        );
      }
    );
  }

  /**
   *  Set selected topic id and stopping propagation of the event.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   * @param index for the topic to find the right topic.
   */
  getNewSubTopicReady(index: number) {
    event.stopPropagation();
    $('#addSubTopicModel').modal('show');
    this.selectedTopicId = this.subArray[index][0].topicID;
  }

  /**
   * Create new subtopic and calling the API end point to add it.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   * @param newSubTopic to add.
   */
  createSubTopic(newSubTopic: string) {
    if (newSubTopic.length > 1) {
      this.subtopicService.addSubTopicName(newSubTopic, this.selectedTopicId, 1).subscribe(
        data => {
          this.subArray = new Array<Topic[]>();
          this.topicPoolCacheData.push(data);
          this.getSubTopics();
          this.alertService.alert('success', 'Successfully added Subtopic');
        },
        err => this.alertService.alert('success', 'Unable to add Subtopic')
      );
      this.selectedTopicId = 0;
    }
  }

}
