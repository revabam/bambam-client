import { Component, OnInit } from '@angular/core';
import { SearchTextService } from '../../../services/search-text.service';


@Component({
  selector: 'app-topic-search',
  templateUrl: './topic-search.component.html',
  styleUrls: ['./topic-search.component.css']
})
export class TopicSearchComponent implements OnInit {

  public topicSearch: string;
  constructor(private textService: SearchTextService) { }

  ngOnInit() {
    this.textService.getMessage().subscribe(data => {
      if (data.type === 'clearTopic') {
        this.topicSearch = '';
      }
    });
  }
  /**
   * To send the search bar text to be searched.
   * @author Mohamed Swelam
   * @author Dylan Britton
   * @author Allan Poindexter
   * @author David Graves
   * @author Charlie Harris
   * @batch 1712-Dec11-2017
   */
  sendSearchText() {
    this.textService.sendMessage(this.topicSearch, 'topic');
  }

}
