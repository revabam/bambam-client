import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getTitle() {
    return browser.getTitle();
  }
  findElementByLinkText(link: string) {
    return element(by.linkText(link));
  }
  findElementBySelector(selector: string) {
    return element(by.css(selector));
  }
  /*
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  */
}
