import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet } from '../../node_modules/@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  envName = environment.envName;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {}
}
