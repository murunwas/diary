import { OurdiaryPage } from './app.po';

describe('ourdiary App', () => {
  let page: OurdiaryPage;

  beforeEach(() => {
    page = new OurdiaryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
