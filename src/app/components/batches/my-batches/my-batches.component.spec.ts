import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBatchesComponent } from './my-batches.component';

describe('MyBatchesComponent', () => {
  let component: MyBatchesComponent;
  let fixture: ComponentFixture<MyBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
