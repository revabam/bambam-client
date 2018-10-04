import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDuplicateModalComponent } from './event-duplicate-modal.component';

describe('EventDuplicateModalComponent', () => {
  let component: EventDuplicateModalComponent;
  let fixture: ComponentFixture<EventDuplicateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDuplicateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDuplicateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
