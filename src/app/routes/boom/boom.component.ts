import { Component, OnInit } from '@angular/core';
import { BoomService } from '../../services/boom.service';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
export class BoomComponent implements OnInit {

  events: any[] = [];
  batches: any[] = [];
  curriculums: any[] = [];
  completed: number[] = [];
  missed: number[] = [];
  canceled: number[] = [];
  weeks: number[] = [];

  constructor(private boomServ: BoomService) { }

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: number[] = this.weeks;
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
   *  @author Richard Iskra | Obosa Nosa-Igiebor | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  getWeeklyProgress(curriculumId) {
    this.completed = [];
    this.missed = [];
    this.canceled = [];
    this.weeks = [];

    for (let j = 0; j < this.curriculums[curriculumId].curriculumWeek.length; j++) {
      this.weeks.push(j);
    }

    for (let j = 0; j < this.curriculums[curriculumId].curriculumWeek.length; j++) {
      let completed = 0;
      let missed = 0;
      let canceled = 0;
      for (let k = 0; k < this.curriculums[curriculumId].curriculumWeek[j].curriculumDay.length; k++) {
        for (let l = 0; l < this.curriculums[curriculumId].curriculumWeek[j].curriculumDay[k].subTopic.length; l++) {
          if (this.curriculums[curriculumId].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 2) {
            ++completed;
          } else if (this.curriculums[curriculumId].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 4) {
            ++missed;
          } else if (this.curriculums[curriculumId].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 3) {
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
  }

  /**
   * Find the selected curriculum
   * @author Richard Iskra | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  selectedCurriculum(event) {
    const id = event.value;
    for (let i = 0; i < this.curriculums.length; i++) {
      if (this.curriculums[i].id === id) {
        this.getWeeklyProgress(i);
      }
    }
    return;
  }


  /**
   * Updates pie chart data when users enter a value in the percentage input field
   *  @author Richard Iskra | Eddie Grays | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */

  percent(event) {
    const prog: number[] = [0, 0];
    const percentile = event.target.value / 100;
    for (let i = 0; i < this.curriculums.length; i++) {
      let completed = 0;
      let length = 0;
      for (let j = 0; j < this.curriculums[i].curriculumWeek.length; j++) {
        for (let k = 0; k < this.curriculums[i].curriculumWeek[j].curriculumDay.length; k++) {
          for (let l = 0; l < this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic.length; l++) {
            if (this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 1
              || this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 3) {
              continue;
            } else if (this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId === 2) {
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
    let clone2 = JSON.parse(JSON.stringify(this.doughnutChartData));
    clone2 = prog;
    this.doughnutChartData = clone2;
  }

  ngOnInit() {
    this.boomServ.getAllEvents().subscribe(x => { this.events = x; });
    this.boomServ.getAllBatches().subscribe(x => { this.batches = x; this.boomServ.getAllCurriculums()
      .subscribe(y => { this.curriculums = y; this.getData(); });
    });
  }

  /**
   * Using the data obtained from ngOnInit, format the data for easier usage
   *  @author Richard Iskra | 1806Spark-Jun25-USF-Java | Steven Kelsey
   */
  getData() {
    while (this.events === [] || this.batches === [] || this.curriculums === []) {
    }
    for (let i = 0; i < this.curriculums.length; i++) {
      for (let j = 0; j < this.curriculums[i].curriculumWeek.length; j++) {
        for (let k = 0; k < this.curriculums[i].curriculumWeek[j].curriculumDay.length; k++) {
          for (let l = 0; l < this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic.length; l++) {
            for (let m = 0; m < this.events.length; m++) {
              if (this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].id === this.events[m].subTopicId) {
                this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId = this.events[m].statusId;
                break;
              } else {
                this.curriculums[i].curriculumWeek[j].curriculumDay[k].subTopic[l].statusId = 1;
              }
            }
          }
        }
      }
      for (let n = 0; n < this.batches.length; n++) {
        if (this.batches[n].calendarCurriculum_id === this.curriculums[i].id) {
          this.curriculums[i].name = this.batches[n].name;
        }
      }
    }
    this.getWeeklyProgress(0);
  }
}

/**
 * @author Richard Iskra | Obosa Nosa-Igiebor | Eddie Grays | 1806Spark-Jun25-USF-Java | Steven Kelsey
 */
