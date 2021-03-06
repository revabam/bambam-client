import { BamUser } from 'src/app/models/bam-user';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CognitoService } from '../../services/cognito.service';

/**
 * This if the login component. It implements the login functionality
 * for the application. It uses the cognito service to interact with
 * the user pool.
 * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  // This is used to display non-error related information to the user
  infoMessage: string;
  // This is used to display errors to the user
  errorMessage: string;
  // Build the form controls.
  loginForm = new FormBuilder().group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.required)
  });

 /**
  * The list of error messages displayed in the mat-error elements
  * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
  */
  loginValidationMessages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Not a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' }
    ]
  };

  constructor(
    private userService: UserService,
    private cognitoService: CognitoService,
    private router: Router
  ) { }

  /**
  * This method runs when the component is initialized. It checks if the user
  * is logged in and, if they are, sends them to the dashboard page.
  * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
  */
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user.id) {
      this.userService.user.next(JSON.parse(sessionStorage.getItem('user')));
      this.router.navigate(['dashboard']);
    }

    /**
    * If the user has just registered a new account, this will display a message
    * telling them to click the verification link in the email we sent them.
    * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
    */
    const info = sessionStorage.getItem('info');
    if (info) {
      this.infoMessage = info;
    }
  }

  /**
  * This method is called whenever the user clicks the login button. It will attempt
  * to authenticate the user in the cognito user pool and if the credentials are valid
  * it will send them to the dashboard.
  * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
  */
  login() {
    // Clear the error message
    this.errorMessage = '';
    // Clear sessionStorage as well
    this.infoMessage = '';
    sessionStorage.clear();
    // Check if there are any errors in the form
    if (
      this.loginForm.get('email').errors ||
      this.loginForm.get('password').errors
    ) {
      this.errorMessage = 'Errors exist on the form';
    } else {
      // No form errors. Attempt to login.
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      // First get the user's id token from cognito
      this.cognitoService.signIn(email, password).subscribe(
        (result: any) => {
          if (result) {
            // If there was an error
            if (result['message']) {
              this.errorMessage = 'Invalid credentials';
              return;
            }
            const user: BamUser = {
              id: result.jwtToken,
              email: result.payload.email,
              firstName: result.payload.given_name,
              lastName: result.payload.family_name
            };
            // This method will take the user attributes from cognito and create a bam user.
            this.userService.user.next(user);
            this.cognitoService.bamUser = user;
            sessionStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['dashboard']);
          }
        }
      );
    }
  }
}

