import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/';
import { Batch } from '../../../models/batch.model';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-batches-table',
  templateUrl: './batches-table.component.html',
  styleUrls: ['./batches-table.component.css']
})
export class BatchesTableComponent implements OnInit {

  @Input() batches: Batch[];
  @Input() title: string;
  @Input() filterText: string;

  filtered: Batch[];
  pageNum = 1;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.filtered = this.batches;
  }

}
