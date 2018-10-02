import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  email: string;
  constructor(private cognito: CognitoService, private router: Router) { }

  ngOnInit() {
  }
  /**
    * This methods calls the Cognito Service to call the resetPassword method.
    * @author Jasmine C. Onwuzulike
    */
  reset() {
    const rest = this.cognito.resetPassword(this.email);
  }
}
