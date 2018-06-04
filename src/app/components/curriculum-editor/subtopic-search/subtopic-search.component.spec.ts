import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicSearchComponent } from './subtopic-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SearchTextService } from '../../../services/search-text.service';

describe('SubtopicSearchComponent', () => {
  let component: SubtopicSearchComponent;
  let fixture: ComponentFixture<SubtopicSearchComponent>;

  let textService: SearchTextService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    textService = TestBed.get(SearchTextService);

    spyOn(textService, 'sendMessage').and.callThrough();

    fixture = TestBed.createComponent(SubtopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that sendSearchText() sends the searchText via textService
   */
  it ('should call textService.sendMessage()', () => {
    component.sendSearchText();

    expect(textService.sendMessage).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that searchText will be cleared when textService gives a message with the "clear" type
   */
  it ('should set searchText to empty string upon receiving a message with type "clear"', () => {

    component.searchText = 'You shouldn\'t see this';

    textService.sendMessage('This is meaningless text', 'clear');

    expect(component.searchText).toEqual('');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that searchText will not be cleared unless textService gives the "clear" message
   */
  it ('should leave searchText untouched upon receiving a message with any type other than "clear"', () => {
    component.searchText = 'This should be displayed';

    textService.sendMessage('clear', 'notclear');
    textService.sendMessage('Clear', 'Clean');
    textService.sendMessage('Translucent', 'Transparent');
    textService.sendMessage('Glass-like', 'Melted&ShapedSand-like');
    textService.sendMessage('Clair', 'klear');

    expect(component.searchText).toEqual('This should be displayed');
  });

});
