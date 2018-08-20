import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CognitoService } from '../../../services/cognito.service';
import { BamUser } from '../../../models/bam-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // This string is used when we check if the password field matches
  // the confirm password field
  message: string;

  // This string is used to display registration errors to the user
  errorMessage: string;

  // Building the form
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

    // This one isn't actually used for verifying validity at the moment,
    // but I'm leaving it here in case a future batch wants to change that.
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ]))
  });

  // Error messages to display to the user
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
    'firstName': [
      {type: 'required', message: 'First name is required'},
      {type: 'maxlength', message: 'First name must be 30 characters or less'}
    ],
    'lastName': [
      {type: 'required', message: 'Last name is required'},
      {type: 'maxlength', message: 'Last name must be 30 characters or less'}
    ]
  };

  constructor(
    private userService: UserService,
    private cognitoService: CognitoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /*
  * This method checks if the password field and confirm password field
  * match. If not, it sets the messages which is displayed as a mat-error
  * on the form.
  */
  checkMatch(conf: string) {
    if (this.registrationForm.get('password').value !== this.registrationForm.get('confirmPassword').value) {
      this.registrationForm.get('confirmPassword').setErrors([{'mismatch': true}]);
      this.message = 'Password mismatch';
    } else {
      this.registrationForm.get('confirmPassword').setErrors([{'mismatch': false}]);
      this.registrationForm.get('confirmPassword').updateValueAndValidity();
      this.message = '';
    }
  }

  /*
  * This method gets the error message for a field. I made this specifically
  * for the password field. When the user input is both too short and doesn't
  * conform to the password regex pattern, angular tries to display multiple
  * error messages under the field. The messages overflow onto the field below.
  * This way, only a single error message is actually shown.
  *
  * @param  field The name of the field
  *
  * @return       The error message, if any
  */
  getErrorMessage(field: string): string {
    let e = '';

    const validations = this.registrationValidationMessages[field];
    for (let i = 0; i < Object.keys(validations).length; i++) {
      const validation = validations[i];

      if (this.registrationForm.get('password').hasError(validation['type']) &&
      (this.registrationForm.get('password').dirty || this.registrationForm.get('password').touched)) {
        e = validation['message'];
      }
    }

    return e;
  }

  /*
  * This method implements the registration functionality. It checks that
  * the input is valid and then makes the call to the cognito service to
  * register the user in the cognito user pool.
  */
  register() {
    // Clear the error message
    this.errorMessage = '';

    // Run the password match check
    this.checkMatch(this.registrationForm.get('confirmPassword').value);
    // Check if there are any errors in the form
    if (
      this.registrationForm.get('email').errors ||
      this.registrationForm.get('password').errors ||
      this.registrationForm.get('firstName').errors ||
      this.registrationForm.get('lastName').errors ||
      this.message
    ) {
      this.errorMessage = 'Errors exist on the form';
    } else {
      // There are no form errors. Attempt to create a new user in cognito.
      const email = this.registrationForm.get('email').value;
      const password = this.registrationForm.get('password').value;
      const firstName = this.registrationForm.get('firstName').value;
      const lastName = this.registrationForm.get('lastName').value;
      this.cognitoService.registerUser(email, password, firstName, lastName).subscribe(
        result => {
          if (result) {
            // If the operation returned an error
            if (result['message']) {
              this.errorMessage = result['message'];
            } else {
              const user: BamUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role_id: 1,
                status_id: 1
              };
              this.userService.register(user).subscribe(
                u => {
                  if (u) {
                    sessionStorage.setItem('info',
                    'Your account has been created. Please click the verification link in the email we sent you and login here.');
                    this.router.navigate(['login']);
                  }
                }
              );
            }
          }
        }
      );
    }
  }
}
