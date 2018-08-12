import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BamUser } from '../../../models/bam-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;

  valid: boolean;
  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    console.log(`Registering with the following values:

      Email: ${this.email}
      Password: ${this.password}
      Confirm Password: ${this.confirmPassword}
      First Name: ${this.firstName}
      Last Name: ${this.lastName}

    `);

    const bamUser: BamUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role_id: 2,
      status_id: 1
    };

    this.userService.register(bamUser).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  emailValid(): boolean {
    let isValid = false;
    // TODO
    return isValid;
  }

  passwordValid(): boolean {
    let isValid = false;
    // TODO
    return isValid;
  }

  firstNameValid(): boolean {
    let isValid = false;
    // TODO
    return isValid;
  }

  lastNameValid(): boolean {
    let isValid = false;
    // TODO
    return isValid;
  }

  passwordConfirmed(): boolean {
    if (this.password !== this.confirmPassword) {
      return false;
    }
    return true;
  }

}
