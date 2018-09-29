import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumWeekComponent } from './curriculum-week.component';

describe('CurriculumWeekComponent', () => {
  let component: CurriculumWeekComponent;
  let fixture: ComponentFixture<CurriculumWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
