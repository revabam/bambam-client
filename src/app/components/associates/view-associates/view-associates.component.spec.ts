import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssociatesComponent } from './view-associates.component';

describe('ViewAssociatesComponent', () => {
  let component: ViewAssociatesComponent;
  let fixture: ComponentFixture<ViewAssociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
