import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMondayModalComponent } from './start-monday-modal.component';

describe('StartMondayModalComponent', () => {
  let component: StartMondayModalComponent;
  let fixture: ComponentFixture<StartMondayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMondayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMondayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
