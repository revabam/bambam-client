import { BamUser } from './../models/bam-user';
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
  private bamUser: BamUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  private aList: string[];

  /**
  * When the cognito service is intialized, it creates the user pool.
  * In a future sprint, I would recommend that these credentials not
  * be hard coded. I didn't have the time to fix this when I was working
  * on the project.
  */
  constructor(
    private router: Router
  ) {
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
   *
   * This method will allow a user to reset their password if forgotten.
   * @param email The user's email that they used to register.
   * The user will need to provide their email which Cognito for check the user
   * pool to verify that that email exists and then it will prompt the user to
   * enter a new password.
   * @author Jasmine C. Onwuzulike
   */
  resetPassword(email: string) {
    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const cognitoUser = new AWSCognito.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {
      },
      onFailure: function(err) {
          alert(err);
      },
      inputVerificationCode() {
          const verificationCode = prompt('Please input verification code ' , '');
          const newPassword = prompt('Enter new password ' , '');
          cognitoUser.confirmPassword(verificationCode, newPassword, this);
      }
    });
    this.router.navigate(['login']);
  }

  /**
   * This methods checks to see the current user. It will check the Cognito User Pool to see
   * the current logged in user and then return their token.
   * @author Jasmine C. Onwuzulike
   */
  getLoggedInUser() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      return cognitoUser.getUsername();
    }
  }

  /**
   * This method will get the current logged in user's attributes.
   * @author Jasmine C. Onwuzulike
   */
  getUserAttributes(): BamUser {
    const cognitoUser = this.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
        }

        cognitoUser.getUserAttributes(function (err, result) {
          this.bamUser.firstName = result[2].getValue() ;
          this.bamUser.id = cognitoUser.getUsername();
          this.bamUser.lastName = result[3].getValue();
          this.bamUser.email = result[4].getValue();
        });
      });
    }

    return this.bamUser;
  }
}
