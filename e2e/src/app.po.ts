import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(link?: string) {
    if (link) {
      return browser.get(`/#/${link}`);
    }
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
  findElementByName(name: string) {
    return element(by.name(name));
  }
  findElementById(id: string) {
    return element(by.id(id));
  }
  /*
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
  */
}
