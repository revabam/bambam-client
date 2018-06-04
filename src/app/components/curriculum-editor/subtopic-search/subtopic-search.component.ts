import { Component, OnInit } from '@angular/core';
import { SearchTextService } from '../../../services/search-text.service';

@Component({
  selector: 'app-subtopic-search',
  templateUrl: './subtopic-search.component.html',
  styleUrls: ['./subtopic-search.component.css']
})
export class SubtopicSearchComponent implements OnInit {

  searchText: string;

  constructor(private textService: SearchTextService) { }

  ngOnInit() {
    this.textService.getMessage().subscribe(data => {
      if (data.type === 'clear') {
        this.searchText = '';
      }
    });
  }
/**
 * To send the search bar text to be searched for the subTopics.
 * @author Mohamed Swelam
 * @author Dylan Britton
 * @author Allan Poindexter
 * @author David Graves
 * @author Charlie Harris
 * @batch 1712-Dec11-2017
 */
  sendSearchText() {
    this.textService.sendMessage(this.searchText, 'subtopic');
  }



}
