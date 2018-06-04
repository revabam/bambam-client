import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BatchService } from '../../services/batch.service';
import { Batch } from '../../models/batch.model';
import { Subtopic } from '../../models/subtopic.model';
import { CalendarService } from '../../services/calendar.service';
import { Boom } from '../../models/boom.model';
import { CurriculumService } from '../../services/curriculum.service';
import { SubtopicService } from '../../services/subtopic.service';
import { UsersService } from '../../services/users.service';
import { Curriculum } from '../../models/curriculum.model';
import { Schedule } from '../../models/schedule.model';
import { ScheduledDate } from '../../models/scheduleddate.model';
import { ScheduledSubtopic } from '../../models/scheduledsubtopic.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
/**
 * This class creates 2 charts:
 * Pie and a bar graph.
 * @author Francisco Palomino | Batch: 1712-dec10-java-steve
 */
export class BoomComponent implements OnInit {

  @ViewChild('barChart') barChart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.yLabel + '%';
        }
      }
    },
    responsive: true
  };
  public pieChartOptions: any = {
    tooltips: {displayColors: false},
    legend: {position: 'left'},
  };
  public barChartLabels: string[] = [];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = false;
  public barColors: any = [{fill: true, backgroundColor: '#ff9945' },
                           {fill: true, backgroundColor: '#b63e4f' }];
  public barChartData: any[] = [];

  public pieChartLegend: Boolean = false;
  public pieChartLabels: string[][] = [];
  public pieChartData: number[] = [];
  public pieChartDatasets: any[] = [];
  public pieColors: any = [{fill: true, backgroundColor: ['#ff9945', '#b63e4f'] }];
  public pieChartType: String = 'pie';

  public percent: Number = 90;
  public batches: any[] = [];
  public chartHeight: Number = 345;
  public pieChartHeight: Number = 345;
  public batchOverallArray: any = [];

  public currentBatches: Batch[] = [];
  public batchSelectionList: Batch[] = [];
  public allBatchSubtopics: Subtopic[][] = [];
  public allSchedules: Schedule[] = [];

  constructor(private batchService: BatchService,
    private calendarService: CalendarService,
    private curriculumService: CurriculumService,
    private subtopicService: SubtopicService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.batchService.getAllInProgress().subscribe(
      getBatches => {
        this.currentBatches = getBatches;
        this.currentBatches.sort((n1, n2) => {
          if (n1.startDate > n2.startDate) {
            return 1;
          }
          if (n1.startDate < n2.startDate) {
            return -1;
          }
          return 0;
        });

        for (let i = 0; i < getBatches.length; i++) {
          this.usersService.getUserByID(getBatches[i].trainerID).subscribe(
            trainer => {
              // get all the trainer infos from user service and add them into the variable that stores all the batch info on this component
              this.currentBatches[i].trainer = trainer;
            }
          );
        }

        this.getBatchSubtopics();
      }
    );
  }
/**
 * Gets all currently active batches from Bam DB
 * @author Francisco Palomino | Batch: 1712-dec10-java-steve
 *  Last updated by: Trevor Fortner (1802-Matt)
 */
  getBatchSubtopics() {
    let count = 1;
    this.currentBatches.forEach((batch, index) => {
      this.curriculumService.getScheduleById(batch.scheduleID).subscribe(
        schedule => {
          if (schedule != null) {
            this.allSchedules.push(schedule);
            const subtopicIDs: number[] = [];
            for (let i = 0; i < schedule.subtopics.length; i++) {
              subtopicIDs.push(schedule.subtopics[i].subtopicId);
            }

            this.subtopicService.getSubtopicByIDs(subtopicIDs).subscribe(
              subtopic => {
                this.allBatchSubtopics[index] = subtopic;
                count++;

                if (count > this.currentBatches.length) { // if we're on the last batch...
                  this.setBatchStats();
                  this.plotBatch(this.batchSelectionList[0].id);
                  this.pieChartPercent(this.percent);
                }
              }
            );
          }
      });
    });
  }

  /**
   * Method returns the week of a current date
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param date
   */
  getWeek(date) {   // put in the batch's start date instead of jan 4th? when is this used?
// shouldn't any instance of this just be able to be replaced by Schedule.ScheduledSubtopic.ScheduledDate.week?
    const thisYear = new Date().getFullYear();
    const subtopicDate: any = new Date(date);
    const jan4th: any = new Date(`04/jan/${thisYear}`);
    return Math.ceil((((subtopicDate.setHours(0, 0, 0, 0) - jan4th.setHours(0, 0, 0, 0))    / 86400000) + jan4th.getDay() + 1) / 7);
      // set the time on that day to the first ms of the day, then divide by (hrs in day * s in hr * ms in s)
      // set hours returns the difference between January 1, 1970 00:00:00 UTC and the new date
  }
  /**
   * Method generates all the statistics of all current active batches and
   * their completeted and missed subtopics
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   *  Last updated by: Trevor Fortner (1802-Matt)
   */
  setBatchStats () {
    for (let i = 0; i < this.currentBatches.length; i++) {
      let totalSubtopics = 0, completedSubtopics = 0, missedSubtopics = 0;
      let currentWeek;
      if (this.allBatchSubtopics[i] != null) {
        this.batchSelectionList.push(this.currentBatches[i]);

        const today = new Date();
        const startDate = new Date(this.currentBatches[i].startDate);
        const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        currentWeek = Math.ceil(diffDays / 7);

        for (let checkweek = 1; checkweek <= currentWeek; checkweek++) {
          for (let y = 0; y < this.allSchedules[i].subtopics.length; y++) {
            if (checkweek === this.allSchedules[i].subtopics[y].date.week) {
              if (this.allBatchSubtopics[i][y].status === 'Completed') {   // if the status is "completed"
                totalSubtopics++;
                completedSubtopics++;
              } else if (this.allBatchSubtopics[i][y].status === 'Missed') {  // if the status is "missed"
                totalSubtopics++;
                missedSubtopics++;
              }
            }
          }
        }

        const batch: Boom = new Boom();
        batch.batchName = this.currentBatches[i].name;
        batch.trainerName = this.currentBatches[i].trainer.firstName + ' ' + this.currentBatches[i].trainer.lastName;
        batch.missed = missedSubtopics;
        batch.completed = completedSubtopics;
        batch.total = totalSubtopics;
        batch.week = currentWeek;
        this.batches.push(batch);
      }
    }
  }
  /**
   * Creates a bar chart of a trainer/batch's weekly progress.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param id selected batch/trainer
   */
   plotBatch(id: Number) {
    const completedSubtop: any[] = [];
    const missedSubTop: any[] = [];
    for (let i = 0; i < this.currentBatches.length; i++) {
      if (this.allBatchSubtopics[i] != null && this.currentBatches[i].id === id) {
        const today = new Date();
        const startDate = new Date(this.currentBatches[i].startDate);
        const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        const currentWeek = Math.ceil(diffDays / 7);

        for (let checkWeek = 1; checkWeek <= currentWeek; checkWeek++) {
          let totalSubtopics = 0;
          let completedSubtopics = 0;
          let missedSubtopics = 0;
          this.barChartLabels.push('Week ' + (checkWeek));
          for (let y = 0; y < this.allBatchSubtopics[i].length; y++) {
            if (checkWeek === this.allSchedules[i].subtopics[y].date.week) {
              if (this.allBatchSubtopics[i][y].status === 'Completed') {
                totalSubtopics++;
                completedSubtopics++;
              } else if (this.allBatchSubtopics[i][y].status === 'Missed') {
                totalSubtopics++;
                missedSubtopics++;
              }
            }
          }   // after tallying up the week's subtopics

          completedSubtop.push(Number(completedSubtopics / totalSubtopics * 100).toFixed(2)); // to 2 decimal places
          missedSubTop.push(Number(missedSubtopics / totalSubtopics * 100).toFixed(2));
        }
        this.barChartData = [
          { data: completedSubtop, label: 'Completed', fill: true,
          backgroundColor: '#ff9945' },
          { data: missedSubTop, label: 'Missed', fill: true,
          backgroundColor: '#b63e4f' }
        ];
        break;
      }
    }
  }
  /**
   * Creates a pie chart from all current active batches and graphs
   * with a default 90% completion value, which can be changed on
   * the client view.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param percent percent value to generate the pie graph
   */
  public pieChartPercent(percent) {
    const allCompletedSubtop: any[] = [];
    const allMissedSubTop: any[] = [];
    const labelComplete: any[] = [];
    const labelMissed: any[] = [];
    this.batchOverallArray = [];
    this.percent = percent;
    labelComplete.push('Batches');
    labelMissed.push('Batches');

    for (let i = 0; i < this.batches.length; i++) {
      let totalCompletedAvg: any = 0;
      let totalMissedAvg: any = 0;

      totalCompletedAvg = Number((this.batches[i].completed / this.batches[i].total * 100).toFixed(2));
      totalMissedAvg = Number((this.batches[i].missed / this.batches[i].total * 100).toFixed(2));

      const trainer = {
        bName: this.batches[i].batchName,
        trainer: this.batches[i].trainerName,
        missed: this.batches[i].missed,
        completed: this.batches[i].completed,
        total: this.batches[i].total,
        week: this.batches[i].week
      };

      this.batchOverallArray.push(trainer); // used to populate the table on the right side

      if (totalCompletedAvg >= percent) {   // if meets the percentage, add to the list of ones that meet it
        labelComplete.push(this.batches[i].batchName + ' ' + totalCompletedAvg + '%');
      } else {        // else, add to the list of batches that don't meet the percent
        labelMissed.push(this.batches[i].batchName + ' ' + totalCompletedAvg + '%');
      }

    }
    this.pieChartLabels = [labelComplete, labelMissed];
    this.pieChartData.push(labelComplete.length - 1);   // plot the total batches that meet the %
    this.pieChartData.push(labelMissed.length - 1);     // versus the total batches that don't meet it

    this.pieChartDatasets = [{ data : this.pieChartData}];
  }
  /**
   * Method takes in a a number between 0 and 100 to recreate
   * the pie chart.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param event used to prevent input
   * @param percent percent input
   */
  changePercent(event: any, percent: Number) {
    if (percent === this.percent && String(percent).length > 1) {
      event.preventDefault();
      return;
    }
    this.pieChartHeight = $(this.pieChart.nativeElement.lastElementChild).height();
    $(this.pieChart.nativeElement).css('min-height', this.pieChartHeight + 'px');
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartDatasets = [];
    if (String(percent) !== '') {
      setTimeout(() => {
        this.pieChartPercent(percent);
      }, 0);
    }
  }
  /**
   * Validates that only numbers are entered in the input field
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param event current typed character
   * @param value the whole input value
   */
  checkInput(event: any, value) {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)
        || inputChar === ' '
        || Number(value + inputChar) > 100
        || Number(inputChar + value) === 0) {
      event.preventDefault();
      return;
    }
  }
  /**
   * Recreates Bar chart with the selected trainer/batch
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   *  Last updated by: Trevor Fortner (1802-Matt)
   * @param id selected batch/trainer
   */
  changeBatch(id) {
    this.chartHeight = 355;
    $(this.barChart.nativeElement).css('min-height', this.chartHeight + 'px');
    this.barChartData = [];
    this.barChartLabels = [];
    setTimeout(() => {
          this.plotBatch(id);
    }, 0);
  }
}
