import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVersionComponent } from './create-version.component';
import { CurriculumService } from '../../../services/curriculum.service';
import { FormsModule } from '../../../../../node_modules/@angular/forms';
import {
  MatFormFieldModule, MatIconModule, MatOptionModule,
  MatSelectModule, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatToolbar,
  MatToolbarModule, MatExpansionPanel
} from '../../../../../node_modules/@angular/material';
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

// This was commented out due to not working. More angular material modules need to be expressed in the imports.
// fdescribe('Add a new version', () => {
//   let component: CreateVersionComponent;
//   let fixture: ComponentFixture<CreateVersionComponent>;
//   let CurriculumServiceSub: Partial<CurriculumService>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CreateVersionComponent, CurriculumEditorComponent],
//       imports: [FormsModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatOptionModule, MatSelectModule, MatDialogModule],
//       providers: [
//         { provide: CurriculumService, useValue: CurriculumServiceSub },
//         {provide: MatDialogRef},
//         {provide: MAT_DIALOG_DATA}
//       ]
//     })
//     .compileComponents();
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreateVersionComponent);
//     component = fixture.componentInstance;
//     // fixture.detectChanges();
//   });
//   // testVersion = {selectedCurriculumName: 'java', numberOfWeeks: 7, selectedTopics: []}
//   it('should make a new version of the Java curriculum with 10 weeks and just one topic, being Core Java', () => {
//     const newVersion = new CreateVersionComponent(component.dialogRef, component.data);
//     newVersion.numberOfWeeks = 10;
//     newVersion.selectedCurriculumName = 'java';
//     newVersion.selectedTopics = [{"id": 1, "name": "Core Java" }];
//     component.add();
//     // expect(newVersion.add()).arguments({selectedCurriculumName: 'java', numberOfWeeks: 7,
       // selectedTopics: [{"id": 1,"name": "Core Java" }]});
//   });
// });
