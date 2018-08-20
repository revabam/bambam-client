import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UserIdleService } from '../../../../../node_modules/angular-user-idle';
import { AppComponent } from '../../../app.component';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  count = 0;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private userIdle: UserIdleService,
    private appComponent: AppComponent,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.count = 0;
  }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      result => {
        if (result !== null) {
          sessionStorage.setItem('user', JSON.stringify(result[0]));
          this.userService.user.next(result[0]);

          // Start watching for user inactivity.
          this.userIdle.startWatching();

          // Start watching when user idle is starting.
          this.userIdle.onTimerStart().subscribe(count => {
            console.log(count);
            this.openModal();
          });

          // Start watch when time is up.
          this.userIdle.onTimeout().subscribe(() => {
            console.log('Time is up!');
            sessionStorage.clear();
            this.router.navigate(['login']);
          });

          this.router.navigate(['dashboard']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal() {
    if (this.count) {
      this.count++;
      this.modal.open(this.modalContent, {size: 'lg'});
    }
  }
  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.count = 0;
    this.userIdle.resetTimer();
  }

}
