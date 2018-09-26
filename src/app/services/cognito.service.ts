import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private userPool: AWSCognito.CognitoUserPool;
 

  /**
  * When the cognito service is intialized, it creates the user pool.
  * In a future sprint, I would recommend that these credentials not
  * be hard coded. I didn't have the time to fix this when I was working
  * on the project.
  */
  constructor() {
    const poolData = {
      UserPoolId : 'us-east-1_7bWZrc3vS',
      ClientId : 'n5l1l6id094g0lk2f3vc1h6h7'
    };

    this.userPool = new AWSCognito.CognitoUserPool(poolData);
  }

  /**
  * This method will create a new user in the cognito user pool. When
  * a user is created, cognito will send that user an email to verify
  * their email account.
  *
  * @param  email     The new user's email address
  * @param  password  The new user's password
  * @param  firstName The new user's first name
  * @param  lastName  The new user's last name
  */
  registerUser(email: string, password: string, firstName: string, lastName: string): BehaviorSubject<object> {

    const attributeList = [];

    // First add the user data to some data objects. The Name attribute
    // is the name of the user attribute in the cognito user pool.
    const emailData = {
      Name: 'email',
      Value: email
    };

    const firstNameData = {
      Name: 'given_name',
      Value: firstName
    };

    const lastNameData = {
      Name: 'family_name',
      Value: lastName
    };

    // Wrap up the data objects as cognito user attributes
    const emailAttribute = new AWSCognito.CognitoUserAttribute(emailData);
    const firstNameAttribute = new AWSCognito.CognitoUserAttribute(firstNameData);
    const lastNameAttribute = new AWSCognito.CognitoUserAttribute(lastNameData);

    // Add everything to the list of attributes
    attributeList.push(emailAttribute);
    attributeList.push(firstNameAttribute);
    attributeList.push(lastNameAttribute);

    // Attempt to add the new user to the pool
    const resultStream = new BehaviorSubject<object>(null);
    this.userPool.signUp(email, password, attributeList, null,
      (error, result) => {
        if (error) {
          resultStream.next(error);
        }
        if (result) {
          resultStream.next(result);
        }
      }
    );

    return resultStream;
  }

  /**
   * This method attempts to sign in the user. If the user is in the pool,
   * it returns a CognitoIdToken. Otherwise it returns an error object.
   * @param email The email address that the user entered
   * @param password The password that the user entered
   */
  signIn(email: string, password: string): BehaviorSubject<object> {
    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const authenticationData = {
      Username: email,
      Password: password
    };

    const authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);

    const cognitoUser = new AWSCognito.CognitoUser(userData);

    const resultStream = new BehaviorSubject<object>(null);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(session: AWSCognito.CognitoUserSession) {
        resultStream.next(session.getIdToken());
      },
      onFailure: function(err: any) {
        resultStream.next(err);
      }
    });
    return resultStream;
  }

/**
 * This method allows user to request a new password if forgotten. 
 * @param email The email address that the user entered.
 *  The method will take the email entered and send it to Cognito which verifies
 * that is is in the user pool and if it is, it will prompt the user to enter
 * a new password and persist that. 
 * @author Jasmine C. Onwuzulike
 */
  
 resetPassword(email : string) {
   const userData = {
     Username: email,
     Pool: this.userPool
   };
   
   const cognitoUser = new AWSCognito.CognitoUser(userData);

   cognitoUser.forgotPassword({
     onSuccess: function (result) {
         console.log('call result: ' + result);
         console.log( JSON.stringify(result));
     },
     onFailure: function(err) {
         alert("That email address does not match our records. Please try again.");
     },
     inputVerificationCode() {
         var verificationCode = prompt('Please input verification code ' ,'');
         var newPassword = prompt('Enter new password ' ,'');
         cognitoUser.confirmPassword(verificationCode, newPassword, this);
     }
 });
 }
}

/**
 * @author Bradley Walker | 1806-Jun18-USF-Java | Wezley Singleton
 */
