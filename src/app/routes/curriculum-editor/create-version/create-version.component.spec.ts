import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVersionComponent } from './create-version.component';
import { CurriculumService } from '../../../services/curriculum.service';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatIconModule, MatOptionModule,
  MatSelectModule, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatToolbar,
  MatToolbarModule, MatExpansionPanel
} from '@angular/material';
import { CurriculumEditorComponent } from '../curriculum-editor/curriculum-editor.component';

/**
 * The Unit test to build this component.
 */
describe('CreateVersionComponent', () => {
  let component: CreateVersionComponent;
  let fixture: ComponentFixture<CreateVersionComponent>;
  let CurriculumServiceSub: Partial<CurriculumService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVersionComponent],
      imports: [FormsModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule, MatDialogModule],
      providers: [
        { provide: CurriculumService, useValue: CurriculumServiceSub },
        { provide: MatDialogRef },
        { provide: MAT_DIALOG_DATA }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVersionComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
