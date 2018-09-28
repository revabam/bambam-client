import { AppPage } from './app.po';
import { BamUser } from 'src/app/models/bam-user';
import { HttpClient, HttpRequest } from 'selenium-webdriver/http';
import { environment } from 'src/environments/environment';

describe('Testing login and register functionality', () => {
  const request = require('request');
  let page: AppPage;
  const testUser: BamUser = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com'
  };

  beforeEach(() => {
    page = new AppPage();
  });

  it('Filling out the registration form', () => {
    page.navigateTo('register');

    // Email field
    page.findElementByName('email').sendKeys(testUser.email);

    // Password fields
    page.findElementByName('password').sendKeys('password');
    page.findElementByName('confirm-password').sendKeys('password');

    // Name fields
    page.findElementByName('first-name').sendKeys(testUser.firstName);
    page.findElementByName('last-name').sendKeys(testUser.lastName);

    // Submit the form
    page.findElementByName('register').click();
  });

  it('Testing that the user was registered by trying to login', () => {
    page.navigateTo('login');

    // Email field
    page.findElementByName('email').sendKeys(testUser.email);

    // Password field
    page.findElementByName('password').sendKeys('password');

    // Submit the form
    page.findElementByName('login').click();

    // Test if the user was successfully logged in
    expect(page.findElementBySelector('p').getText()).toEqual('dashboard works!');
  });

  afterAll(() => {
    const jar = request.jar();
    const req = request.defaults({
      jar : jar
    });

    req.get(environment.apiUrl + `users?email=${testUser.email}`, (error, message) => {
      const user: BamUser = JSON.parse(message['body'])[0];
      console.log(user);
      console.log(user.id);
      req.delete(environment.apiUrl + `users/${user.id}`, (e, m) => {
        if (error) {
          console.log('An error occured');
          console.log(e);
        } else {
          console.log('Test user removed from database.');
        }
      });
    });
  });
});
