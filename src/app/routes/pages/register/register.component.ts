import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BamUser } from '../../../models/bam-user';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // email: string;
  // password: string;
  // confirmPassword: string;
  firstName: string;
  lastName: string;

  valid: boolean;
  message: string;

  registrationForm = new FormBuilder().group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])
      // ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,}
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$')])),
    confirmPassword: new FormControl('', Validators.compose([
      Validators.required
    ]))
  });

  registrationValidationMessages = {
    'email': [
      {type: 'required', message: 'Email is required'},
      {type: 'email', message: 'Not a valid email'}
    ],
    'password': [
      {type: 'required', message: 'Password is required'},
      {type: 'pattern', message: 'Password must contain: 1 lowercase letter, 1 uppercase letter, 1 number'},
      {type: 'minlength', message: 'Password must be at least 8 characters long'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'Confirm password is required'},
      {type: 'areEqual', message: 'Password mismatch'}
    ]
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  checkMatch(conf: string) {

    console.log(this.registrationForm.get('password').value);
    console.log(this.registrationForm.get('confirmPassword').value);

    if (this.registrationForm.get('password').value !== this.registrationForm.get('confirmPassword').value) {
      this.registrationForm.get('confirmPassword').setErrors([{'mismatch': true}]);
      this.message = 'Password mismatch';
      console.log('mismatch');
    } else {
      this.registrationForm.get('confirmPassword').setErrors([{'mismatch': false}]);
      this.registrationForm.get('confirmPassword').updateValueAndValidity();
      this.message = '';
    }
  }

  register() {
    // console.log(`Registering with the following values:

    //   Email: ${this.email}
    //   Password: ${this.password}
    //   Confirm Password: ${this.confirmPassword}
    //   First Name: ${this.firstName}
    //   Last Name: ${this.lastName}

    // `);

    // const bamUser: BamUser = {
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   email: this.email,
    //   role_id: 2,
    //   status_id: 1
    // };

    // this.userService.register(bamUser).subscribe(
    //   result => {
    //     console.log(result);
    //   }
    // );
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

}
