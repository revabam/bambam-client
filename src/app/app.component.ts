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

  // openBottomSheet(): void {
  //   this.bottomSheet.open(SessionTimeoutComponent);
  // }

  ngOnInit() {}
}
// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'session-timeout',
//   templateUrl: 'session-timeout.html',
// })
// export class SessionTimeoutComponent {
//   constructor(private bottomSheetRef: MatBottomSheetRef<SessionTimeoutComponent>) {}

//   openLink(event: MouseEvent): void {
//     this.bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
// }
