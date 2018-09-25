import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
export class BoomComponent implements OnInit {

  data = {
    focus: "full-stack java", curriculum: [{ week: "week 1", tasks: [{ name: "html", status: 1 }, { name: "css", status: 1 }, { name: "js", status: 1 }] },
    { week: "week 2", tasks: [{ name: "java", status: 1 }, { name: "hibernate", status: 2 }, { name: "spring", status: 1 }, { name: "aws", status: 1 }] },
    { week: "week 3", tasks: [{ name: "ts", status: 1 }, { name: "angular", status: 2 }, { name: "sql", status: 1 }, { name: "dev-ops", status: 2 }] }]
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
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: this.completed, label: 'Completed' },
    { data: this.missed, label: 'Missed' }
  ];


//ponut chart
  public doughnutChartLabels: string[] = ['Completed', 'Missed'];
  public doughnutChartData: number[] = this.getProgres();
  public doughnutChartType: string = 'doughnut';

  getProgres() {
    var prog: number[] = [0, 0];
    for (var i = 0; i < this.data.curriculum.length; i++) {
      for (var j = 0; j < this.data.curriculum[i].tasks.length; j++) {
        if (this.data.curriculum[i].tasks[j].status == 1) {
          ++prog[0];
        } else if (this.data.curriculum[i].tasks[j].status == 2) {
          ++prog[1];
        }
      }
    }
    return prog;
  }

  ngOnInit() {
    var completed = 0;
    var missed = 0;
    for(var i = 0; i < this.data.curriculum.length; i++){
      //get week titles for the axis lables
      this.weeks.push(this.data.curriculum[i].week);

      //get the completed and missed takss and count how many there are each week
      for(var j = 0; j < this.data.curriculum[i].tasks.length; j++){
        if(this.data.curriculum[i].tasks[j].status == 1){
          ++completed;
        } else if (this.data.curriculum[i].tasks[j].status == 2){
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
