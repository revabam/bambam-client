import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingSubtopicModalComponent } from './existing-subtopic-modal.component';
import { Dependencies } from '../../../bam.test.module';

describe('ExistingSubtopicModalComponent', () => {
  let component: ExistingSubtopicModalComponent;
  let fixture: ComponentFixture<ExistingSubtopicModalComponent>;
  let spy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ExistingSubtopicModalComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingSubtopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
     spy = spyOn(component, 'ngOnInit');
     component.ngOnInit();
     expect(spy).toHaveBeenCalled();
  });
  it('should call addExistingSubtopicEvent', () => {
    spy = spyOn(component, 'addExistingSubtopicEvent');
    component.addExistingSubtopic();
  });
  it('should add existing subtopic', () => {
    spy = spyOn(component, 'addExistingSubtopic');
    component.addExistingSubtopic();
    expect(spy).toHaveBeenCalled();
  });

});
