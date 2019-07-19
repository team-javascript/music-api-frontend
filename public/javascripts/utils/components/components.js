import Html from "../Html/Html";
import Api from "../api/Api";
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select("#app");
  }

  getWrapperDiv() {
    return Html()
      .create("div")
      .addClass("wrapper");
  }

  renderNavMenu() {
    const navMenu = Html()
      .create("nav")
      .addClass("nav-menu");

    const navList = Html()
      .create("ul")
      .addClass("nav-menu__list");

    const navListItemHome = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Home");
    navList.addChild(navListItemHome);
    navMenu.addChild(navList);
    return navMenu;
  }

  renderMainHeader() {
    const mainHeader = Html()
      .create("header")
      .addClass("header");
    const mainHeaderTitle = Html()
      .create("h1")
      .addClass("header-title")
      .text("Muzify");
    // const nav = this.renderMainNav();
    mainHeader.addChild(mainHeaderTitle);
    // mainHeader.addChild(nav);
    return mainHeader;
  }

  renderMainFooter() {
    const mainFooter = Html()
      .create("footer")
      .addClass("footer");
    const mainFooterCopy = Html()
      .create("small")
      .addClass("copy")
      .html("&copy; 2019 Muzify");
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }

  renderContentBlock(requestedData) {
    const contentBlock = Html()
      .create("section")
      .addClass("content-block");

    const contentTitle = Html()
      .create("h2")
      .addClass("content-title");

    const contentList = Html()
      .create("ul")
      .addClass("content-list");

    //Dynamically render data from API
    // Api().getRequest()

    contentBlock.addChild(contentTitle);
    contentBlock.addChild(contentList);
  }

  renderPageArtists() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("artists"));
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const navMenu = this.renderNavMenu();
    // const mainContent = this.renderMainContent('books');
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    // wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
