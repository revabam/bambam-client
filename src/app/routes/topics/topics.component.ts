import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topic: String;
  topics = {
    names: ['Java', 'SQL', 'Hibernate'],
    Java: ['ada', 'lisp', 'haskell'],
    SQL: ['a', 'b', 'c'],
    Hibernate: ['1', '2', '3']
  };

  constructor() { }

  ngOnInit() {
  }

}
