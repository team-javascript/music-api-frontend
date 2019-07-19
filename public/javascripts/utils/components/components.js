import Html from '../Html/Html';
import Api from '../api/Api';
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select('#app');
  }

  getWrapperDiv() {
    return Html()
      .create('div')
      .addClass('wrapper');
  }

  renderMainHeader() {
    const mainHeader = Html()
      .create('header')
      .addClass('header');
    const mainHeaderTitle = Html()
      .create('h1')
      .addClass('header-title')
      .text('Muzify');
    // const nav = this.renderMainNav();
    mainHeader.addChild(mainHeaderTitle);
    // mainHeader.addChild(nav);
    return mainHeader;
  }

  renderContentBlock(requestedData) {
    const contentBlock = Html()
      .create('section')
      .addClass('content-block');

    const contentTitle = Html()
      .create('h2')
      .addClass('content-title');

    const contentList = Html()
      .create('ul')
      .addClass('content-list');

    //Dynamically render data from API
    // Api().getRequest()

    contentBlock.addChild(contentTitle);
    contentBlock.addChild(contentList);
  }

  renderPageArtists() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select('.content')
      .select('.container');
    currentMainContentContainer.replace(this.renderContentBlock('artists'));
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    // const mainContent = this.renderMainContent('books');
    // const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    // wrapperDiv.addChild(mainContent);
    // wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
