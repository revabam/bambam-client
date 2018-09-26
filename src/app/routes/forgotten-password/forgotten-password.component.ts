import { Router } from '@angular/router';
import { CognitoService } from './../../services/cognito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  email: string;
  constructor(private cognito: CognitoService, private router : Router) { }

  ngOnInit() {
  }
  /**
   * This methods allows a user to reset their password.
   */
  reset() {
   const rest =  this.cognito.resetPassword(this.email);
     this.router.navigate(['login']);
  }


}
