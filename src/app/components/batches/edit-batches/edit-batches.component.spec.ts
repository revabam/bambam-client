import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchesComponent } from './edit-batches.component';

describe('EditBatchesComponent', () => {
  let component: EditBatchesComponent;
  let fixture: ComponentFixture<EditBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
