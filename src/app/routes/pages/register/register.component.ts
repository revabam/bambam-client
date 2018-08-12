import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
  }

  emailValid(): boolean {
    let isValid: boolean = false;
    // TODO
    return isValid;
  }

  passwordValid(): boolean {
    let isValid: boolean = false;
    // TODO
    return isValid;
  }

  firstNameValid(): boolean {
    let isValid: boolean = false;
    // TODO
    return isValid;
  }

  lastNameValid(): boolean {
    let isValid: boolean = false;
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
