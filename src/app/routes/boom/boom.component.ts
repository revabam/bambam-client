import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
export class BoomComponent implements OnInit {

  data = [{
    title: '1806Spark Jun25 Java - Steven', id: 1, curriculum:
      [{ week: 'week 1', tasks: [{ name: 'html', status: 1 }, { name: 'css', status: 1 },
                                 { name: 'js', status: 1 }, { name: 'mongoDb', status: 3 }] },
      {
        week: 'week 2', tasks: [{ name: 'java', status: 1 }, { name: 'hibernate', status: 1 },
                                { name: 'spring', status: 2 }, { name: 'aws', status: 1 }]
      },
      {
        week: 'week 3', tasks: [{ name: 'ts', status: 1 }, { name: 'angular', status: 1 },
                                { name: 'sql', status: 1 }, { name: 'dev-ops', status: 2 }]
      }, { week: 'week 4', tasks: [] }]
  },
  {
    title: '1802 Feb05 Java - August', id: 2, curriculum:
      [{ week: 'week 1', tasks: [{ name: 'html', status: 1 }, { name: 'css', status: 1 },
                                 { name: 'js', status: 1 }, { name: 'mongoDb', status: 2 }] },
      {
        week: 'week 2', tasks: [{ name: 'java', status: 1 }, { name: 'hibernate', status: 3 },
                                { name: 'spring', status: 1 }, { name: 'aws', status: 1 }]
      },
      {
        week: 'week 3', tasks: [{ name: 'ts', status: 1 }, { name: 'angular', status: 2 },
                                { name: 'sql', status: 1 }, { name: 'dev-ops', status: 3 }]
      },
      {
        week: 'week 4', tasks: [{ name: 'stuff', status: 1 }, { name: 'more stuff', status: 2 },
                                { name: 'even more stuff', status: 3 }, { name: 'yet even more stuff :O', status: 1 }]
      }]
  }
  ];

  completed: number[] = [];
  missed: number[] = [];
  canceled: number[] = [];
  weeks: string[] = [];

  constructor() { }

  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = this.weeks;
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
  public doughnutChartLabels: string[] = ['Percentile rached', 'Under percentile'];
  public doughnutChartData: number[] = [this.data.length, 0];
  public doughnutChartType = 'doughnut';
  public donutColors = [{ backgroundColor: ['green', 'yellow'] }];

  /**
   *  get the progress of the selected batch
   */
  getWeeklyProgress(curriculumId) {
    this.completed = [];
    this.missed = [];
    this.canceled = [];
    this.weeks = [];

    // get week titles for the axis lables
    for (let k = 0; k < this.data[curriculumId].curriculum.length; k++) {
      this.weeks.push(this.data[curriculumId].curriculum[k].week);
    }
    this.barChartLabels = this.weeks;

    // get the completed and missed tasks and count how many there are each week
    for (let i = 0; i < this.data[curriculumId].curriculum.length; i++) {
      let completed = 0;
      let missed = 0;
      let canceled = 0;
      for (let j = 0; j < this.data[curriculumId].curriculum[i].tasks.length; j++) {
        if (this.data[curriculumId].curriculum[i].tasks[j].status === 1) {
          ++completed;
        } else if (this.data[curriculumId].curriculum[i].tasks[j].status === 2) {
          ++missed;
        } else if (this.data[curriculumId].curriculum[i].tasks[j].status === 3) {
          ++canceled;
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
   * Find the selected batch curriculum
   */
  selectedCurriculum(event) {
    const id = event.value;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.getWeeklyProgress(i);
      }
    }
    return;
  }

  /**
   * Updates pie chart data when users enter a value in the percentage input feild
   */
  percent(event) {
    const prog: number[] = [0, 0];
    const percentile = event.target.value / 100;
    // for each curriculum
    for (let k = 0; k < this.data.length; k++) {
      let completed = 0;
      let length = 0;
      // for each week
      for (let i = 0; i < this.data[k].curriculum.length; i++) {
        // for each task
        for (let j = 0; j < this.data[k].curriculum[i].tasks.length; j++) {
          if (this.data[k].curriculum[i].tasks[j].status === 1) {
            ++completed;
          }
          length++;
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
    this.getWeeklyProgress(0);
  }
}

/**
 * @author Richard Iskra | Obosa Nosa-Igiebor | Eddie Grays
 */
