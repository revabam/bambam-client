import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
export class BoomComponent implements OnInit {

  data = [{
    title: '1806Spark Jun25 Java - Steven', id: 1, curriculum:
      [{ week: 'week 1', tasks: [{ name: 'html', status: 1 }, { name: 'css', status: 1 }, { name: 'js', status: 1 }] },
      {
        week: 'week 2', tasks: [{ name: 'java', status: 1 }, { name: 'hibernate', status: 1 },
        { name: 'spring', status: 2 }, { name: 'aws', status: 1 }]
      },
      {
        week: 'week 3', tasks: [{ name: 'ts', status: 1 }, { name: 'angular', status: 1 },
        { name: 'sql', status: 1 }, { name: 'dev-ops', status: 1 }]
      }, { week: 'week 4', tasks: [{ name: 'a thing', status: 3 }] }]
  },
  {
    title: '1802 Feb05 Java - August', id: 2, curriculum:
      [{ week: 'week 1', tasks: [{ name: 'html', status: 1 }, { name: 'css', status: 1 }, { name: 'js', status: 1 }] },
      {
        week: 'week 2', tasks: [{ name: 'java', status: 1 }, { name: 'hibernate', status: 2 },
        { name: 'spring', status: 1 }, { name: 'aws', status: 1 }]
      },
      {
        week: 'week 3', tasks: [{ name: 'ts', status: 1 }, { name: 'angular', status: 2 },
        { name: 'sql', status: 1 }, { name: 'dev-ops', status: 2 }]
      },
      {
        week: 'week 4', tasks: [{ name: 'stuff', status: 1 }, { name: 'more stuff', status: 2 },
        { name: 'even more stuff', status: 1 }, { name: 'yet even more stuff :O', status: 1 }]
      }]
  }
  ];

  completed: number[] = [];
  missed: number[] = [];
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
    { data: [], label: 'Missed' }
  ];

  public barColors: Array<any> = [
    { // correct color
      backgroundColor: 'rgb(51, 230, 51)',
      borderColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgba(255,255,255,1)',
    },
    { // missed color
      backgroundColor: 'rgb(255, 255, 56)',
      borderColor: 'rgba(255,255,255,1)',
      pointBorderColor: 'rgba(255,255,255,1)',
    }];

  // donut chart
  public doughnutChartLabels: string[] = ['Completed', 'Missed'];
  public doughnutChartData: number[] = this.getProgres();
  public doughnutChartType = 'doughnut';
  public donutColors = [{backgroundColor: ['rgb(51, 230, 51)', 'rgb(255, 255, 56)']}];

  /**
   * determines how many tasks have been completed and how many have been missed
   */
  getProgres() {
    const prog: number[] = [0, 0];
    for (let k = 0; k < this.data.length; k++) { // for each curriculum
      for (let i = 0; i < this.data[k].curriculum.length; i++) { // for each week
        for (let j = 0; j < this.data[k].curriculum[i].tasks.length; j++) { // for each task
          if (this.data[k].curriculum[i].tasks[j].status === 1) { // if the task was completed
            ++prog[0];
          } else if (this.data[k].curriculum[i].tasks[j].status === 2) { // if the task was missed
            ++prog[1];
          }
        }
      }
    }
    return prog;
  }

  /**
   *  get the progress of the selected batch
   */
  getWeeklyProgress(curriculumId) {
    this.completed = [];
    this.missed = [];
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
      for (let j = 0; j < this.data[curriculumId].curriculum[i].tasks.length; j++) {
        if (this.data[curriculumId].curriculum[i].tasks[j].status === 1) {
          ++completed;
        } else if (this.data[curriculumId].curriculum[i].tasks[j].status === 2) {
          ++missed;
        }
      }
      this.completed.push(completed);
      this.missed.push(missed);
    }
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.completed;
    clone[1].data = this.missed;
    this.barChartData = clone;
  }

  /**
   * Find the selected bacth curriculum
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

  ngOnInit() {
    this.getWeeklyProgress(0);
  }
}
