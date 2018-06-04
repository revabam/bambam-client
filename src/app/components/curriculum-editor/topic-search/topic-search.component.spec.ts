import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSearchComponent } from './topic-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SearchTextService } from '../../../services/search-text.service';

describe('TopicSearchComponent', () => {
  let component: TopicSearchComponent;
  let fixture: ComponentFixture<TopicSearchComponent>;

  let textService: SearchTextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {

    textService = TestBed.get(SearchTextService);

    spyOn(textService, 'sendMessage').and.callThrough();

    fixture = TestBed.createComponent(TopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that sendSearchText() sends the topicSearch via textService
   */
  it ('should call textService.sendMessage()', () => {
    component.sendSearchText();

    expect(textService.sendMessage).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that topicSearch will be cleared when textService gives a message with the "clearTopic" type
   */
  it ('should set topicSearch to empty string upon receiving a message with type "clearTopic"', () => {

    component.topicSearch = 'You shouldn\'t see this';

    textService.sendMessage('This is meaningless text', 'clearTopic');

    expect(component.topicSearch).toEqual('');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that topicSearch will not be cleared unless textService gives the "clearTopic" message
   */
  it ('should leave topicSearch untouched upon receiving a message with any type other than "clearTopic"', () => {
    component.topicSearch = 'This should be displayed';

    textService.sendMessage('clearTopic', 'notclear');
    textService.sendMessage('ClearTopic', 'Clean');
    textService.sendMessage('Translucent', 'Transparent');
    textService.sendMessage('Glass-like', 'Melted&ShapedSand-like');
    textService.sendMessage('Clair', 'klearTopic');

    expect(component.topicSearch).toEqual('This should be displayed');
  });

});
