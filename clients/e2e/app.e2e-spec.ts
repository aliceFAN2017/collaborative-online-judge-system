import { ClientsPage } from './app.po';

describe('clients App', function() {
  let page: ClientsPage;

  beforeEach(() => {
    page = new ClientsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
