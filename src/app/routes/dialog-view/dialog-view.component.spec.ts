import { HttpClient } from 'selenium-webdriver/http';
import { Topic } from './../../models/topic';
import { TopicService } from './../../services/topic.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogViewComponent } from './dialog-view.component';

describe('DialogViewComponent', () => {
  let component: DialogViewComponent;
  let fixture: ComponentFixture<DialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*   it('should get all topics', function() {
    const testTopic = new TopicService(null);
    spyOn(testTopic, 'getAll');
    testTopic.getAll();
    expect(testTopic.getAll).toHaveBeenCalled();
  }); */
});
