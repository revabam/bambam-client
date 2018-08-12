import { AppPage } from './app.po';

describe('Introductory Test Cases for Protractor', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('The title should be BambamClient', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('BambamClient');
  });

  it('Clicking the Calendar Link, the title should be August 2018', () => {
    page.navigateTo();
    page.findElementByLinkText('Calendar').click();
    expect(page.findElementBySelector('h3').getText()).toEqual('August 2017');
  });
});
describe('Introductory Test Cases for Protractor [2]', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('The title should be BambamClient', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('BambamClient');
  });

  it('Clicking the Calendar Link, the title should be August 2018', () => {
    page.navigateTo();
    page.findElementByLinkText('Calendar').click();
    expect(page.findElementBySelector('h3').getText()).toEqual('August 2018');
  });
});