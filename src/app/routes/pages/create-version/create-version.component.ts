import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Curriculum } from '../../../models/curriculum';
import { Topic } from '../../../models/topic';
import { CurriculumEditorComponent } from '../curriculum-editor/curriculum-editor.component';

@Component({
  selector: 'app-create-version',
  templateUrl: './create-version.component.html',
  styleUrls: ['./create-version.component.css']
})
export class CreateVersionComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateVersionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    // TODO: Save data
    this.close();
  }

}
