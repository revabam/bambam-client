import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVersionComponent } from './create-version.component';
import { CurriculumService } from '../../../services/curriculum.service';

describe('CreateVersionComponent', () => {
  let component: CreateVersionComponent;
  let fixture: ComponentFixture<CreateVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVersionComponent, CurriculumService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('Add a new version', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVersionComponent, CurriculumService ]
    })
    .compileComponents();
  }));
  let component: CreateVersionComponent;
  let fixture: ComponentFixture<CreateVersionComponent>;

  testVersion = {selectedCurriculumName: 'java', numberOfWeeks: 7, selectedTopics: []}
  it('should make a new version of the Java curriculum',() => {
    const newVesion = new CreateVersionComponent();
    expect(newVesion.add())
  });
})
