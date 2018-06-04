import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-batches-search',
  templateUrl: './batches-search.component.html',
  styleUrls: ['./batches-search.component.css']
})
export class BatchesSearchComponent implements OnInit {

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  /**
   * Emits filter text to any components listening to [this.change]
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  sendFilterText(event) {
    this.change.emit(event);
  }

}
