import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
export class BoomComponent implements OnInit {

  data = {
    focus: 'full-stack java', curriculum:
    [{ week: 'week 1', tasks: [{ name: 'html', status: 1 }, { name: 'css', status: 1 }, { name: 'js', status: 1 }] },
    { week: 'week 2', tasks: [{ name: 'java', status: 1 }, { name: 'hibernate', status: 2 },
        { name: 'spring', status: 1 }, { name: 'aws', status: 1 }] },
    { week: 'week 3', tasks: [{ name: 'ts', status: 1 }, { name: 'angular', status: 2 },
        { name: 'sql', status: 1 }, { name: 'dev-ops', status: 2 }] }]
  };

  completed = [];
  missed = [];
  weeks: string[] = [];

  constructor() { }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = this.weeks;
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: this.completed, label: 'Completed' },
    { data: this.missed, label: 'Missed' }
  ];


  // Donut chart
  public doughnutChartLabels: string[] = ['Completed', 'Missed'];
  public doughnutChartData: number[] = this.getProgres();
  public doughnutChartType = 'doughnut';


  /**
   * determines how many tasks have been completed and how many have been missed
   */
  getProgres() {
    const prog: number[] = [0, 0];
    for (let i = 0; i < this.data.curriculum.length; i++) {
      for (let j = 0; j < this.data.curriculum[i].tasks.length; j++) {
        if (this.data.curriculum[i].tasks[j].status === 1) {
          ++prog[0];
        } else if (this.data.curriculum[i].tasks[j].status === 2) {
          ++prog[1];
        }
      }
    }
    return prog;
  }

  /**
   * Prepare data to be populated into the charts
   */
  ngOnInit() {
    let completed = 0;
    let missed = 0;
    for (let i = 0; i < this.data.curriculum.length; i++) {
      // get week titles for the axis lables
      this.weeks.push(this.data.curriculum[i].week);

      // get the completed and missed tasks and count how many there are each week
      for (let j = 0; j < this.data.curriculum[i].tasks.length; j++) {
        if (this.data.curriculum[i].tasks[j].status === 1) {
          ++completed;
        } else if (this.data.curriculum[i].tasks[j].status === 2) {
          ++missed;
        }
      }
      this.completed.push(completed);
      this.missed.push(missed);
      completed = 0;
      missed = 0;
    }
  }
}
