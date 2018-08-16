import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BamUser } from '../../../models/bam-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      result => {
        if (result !== null) {
          const user = result[0];
          sessionStorage.setItem('user', JSON.stringify(user));
          this.userService.user.next(user);
          this.router.navigate(['dashboard']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
