import { Curriculum } from './../../models/curriculum';
import { SubTopicService } from './../../services/subtopic.service';
import { Component, OnInit } from '@angular/core';
import { BoomService } from '../../services/boom.service';
import { CurriculumService } from '../../services/curriculum.service';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.scss']
})

/**
 * @author Richard Iskra | Obosa Nosa-Igiebor | Eddie Grays | 1806Spark-Jun25-USF-Java | Steven Kelsey
 */
export class BoomComponent implements OnInit {

  events: any[] = [];
  batches: any[] = [];
  curriculums: any[] = [{
    name: 'Java 1', curriculumId: 1, curriculumWeeks: [
      {curriculumDays: [
        {daySubTopics: [{statusId: 2}, {statusId: 3}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]}]},
      {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 3}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 3}]}]},
      {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 3}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 4}, {statusId: 4}]}]}]},
    {name: 'Java 2', curriculumId: 2, curriculumWeeks: [
      {curriculumDays: [
        {daySubTopics: [{statusId: 2}, {statusId: 3}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]}]},
      {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 3}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]}]},
      {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 3}]}]}]},
    {name: 'Java 3', curriculumId: 3, curriculumWeeks: [{curriculumDays: [
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 3}]}]},
    {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 4}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]}]},
    {curriculumDays: [{daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 2}]},
        {daySubTopics: [{statusId: 3}, {statusId: 2}]},
        {daySubTopics: [{statusId: 2}, {statusId: 4}]}]}]}];

  completed: number[] = [];
  missed: number[] = [];
  canceled: number[] = [];
  weeks: number[] = [];

  constructor(
    private boomServ: BoomService,
    private curriculumService: CurriculumService,
    private subtopicService: SubTopicService
  ) { }

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: number[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [], label: 'Completed' },
    { data: [], label: 'Missed' },
    { data: [], label: 'Canceled' }
  ];

  public barColors: Array<any> = [
    {
      // correct color
      backgroundColor: 'green',
      borderColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgba(255,255,255,1)',
    },
    {
      // missed color
      backgroundColor: 'yellow',
      borderColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgba(255,255,255,1)',
    },
    {
      // canceled color
      backgroundColor: 'red',
      borderColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgba(255,255,255,1)',
    }];

  // donut chart
  public doughnutChartLabels: string[] = ['Percentile reached', 'Under percentile'];
  public doughnutChartData: number[] = [this.curriculums.length, 0];
  public doughnutChartType = 'doughnut';
  public donutColors = [{ backgroundColor: ['green', 'yellow'] }];

  /**
   *  get the progress of the selected batch
   *  @param number - used to determin whih batch we want to track
   *  @author Richard Iskra | Obosa Nosa-Igiebor | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  getWeeklyProgress(curriculumId) {
    this.completed = [];
    this.missed = [];
    this.canceled = [];
    this.weeks = [];

    for (let j = 0; j < this.curriculums[curriculumId].curriculumWeeks.length; j++) {
      this.weeks.push(j + 1);
    }

    for (let j = 0; j < this.curriculums[curriculumId].curriculumWeeks.length; j++) {
      let completed = 0;
      let missed = 0;
      let canceled = 0;
      for (let k = 0; k < this.curriculums[curriculumId].curriculumWeeks[j].curriculumDays.length; k++) {
        for (let l = 0; l < this.curriculums[curriculumId].curriculumWeeks[j].curriculumDays[k].daySubTopics.length; l++) {
          if (this.curriculums[curriculumId].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 2) {
            ++completed;
          } else if (this.curriculums[curriculumId].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 4) {
            ++missed;
          } else if (this.curriculums[curriculumId].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 3) {
            ++canceled;
          }
        }
      }
      this.completed.push(completed);
      this.missed.push(missed);
      this.canceled.push(canceled);
    }
    // update the data
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.completed;
    clone[1].data = this.missed;
    clone[2].data = this.canceled;
    this.barChartData = clone;
    this.barChartLabels = this.weeks;
  }

  /**
   * Find the selected curriculum, event is the id of the selected curriculum
   * @param number - finds the curriculum chosen by the user
   * @author Richard Iskra | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  selectedCurriculum(event) {
    const id = event.value;
    for (let i = 0; i < this.curriculums.length; i++) {
      if (this.curriculums[i].curriculumId === id) {
        this.getWeeklyProgress(i);
      }
    }
  }

  /**
   * Updates pie chart data when users enter a value in the percentage input field, event is the given percentile
   *  @param number - percentile used to track progress of all batches
   *  @author Richard Iskra | Eddie Grays | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  percent(event) {
    const prog: number[] = [0, 0];
    const percentile = event.target.value / 100;
    for (let i = 0; i < this.curriculums.length; i++) {
      let completed = 0;
      let length = 0;
      for (let j = 0; j < this.curriculums[i].curriculumWeeks.length; j++) {
        for (let k = 0; k < this.curriculums[i].curriculumWeeks[j].curriculumDays.length; k++) {
          for (let l = 0; l < this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics.length; l++) {
            if (this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 1
              || this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 3) {
              continue;
            } else if (this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId === 2) {
              ++completed;
            }
            ++length;
          }
        }
      }
      if (completed / length >= percentile) {
        ++prog[0];
      } else {
        ++prog[1];
      }
    }
    // update the data
    let clone = JSON.parse(JSON.stringify(this.doughnutChartData));
    clone = prog;
    this.doughnutChartData = clone;
  }

  ngOnInit() {
    this.getWeeklyProgress(0);
  }

  /**
   * Format data gathered from the H2 database
   *  @author Richard Iskra | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  getData() {
    while (this.events === [] || this.batches === [] || this.curriculums === []) {
    }
    for (let i = 0; i < this.curriculums.length; i++) {
      for (let j = 0; j < this.curriculums[i].curriculumWeeks.length; j++) {
        for (let k = 0; k < this.curriculums[i].curriculumWeeks[j].curriculumDays.length; k++) {
          for (let l = 0; l < this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics.length; l++) {
            for (let m = 0; m < this.events.length; m++) {
              if (this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].id === this.events[m].subTopicId) {
                this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId = this.events[m].statusId;
                break;
              } else {
                this.curriculums[i].curriculumWeeks[j].curriculumDays[k].daySubTopics[l].statusId = 1;
              }
            }
          }
        }
      }
      for (let n = 0; n < this.batches.length; n++) {
        if (this.batches[n].calendarCurriculum_id === this.curriculums[i].id) {
          this.curriculums[i].name = this.batches[n].name + ' ' + this.batches[n].version;
        }
      }
    }
    this.getWeeklyProgress(0);
  }
}
