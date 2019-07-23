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

  renderNavMenu() {
    const navMenu = Html()
      .create('nav')
      .addClass('nav-menu');

    const navList = Html()
      .create('ul')
      .addClass('nav-menu__list');

    const navListItemHome = Html()
      .create('li')
      .addClass('nav-menu__list-item')
      .addAnchor('/#', 'Home')
      .click(event => {
        event.preventDefault();
        this.renderPageHome();
      });

    const navListItemSongs = Html()
      .create('li')
      .addClass('nav-menu__list-item')
      .addAnchor('/#', 'Songs')
      .click(event => {
        event.preventDefault();
        this.renderPageSongs();
      });
    const navListItemAlbums = Html()
      .create('li')
      .addClass('nav-menu__list-item')
      .addAnchor('/#', 'Albums')
      .click(event => {
        event.preventDefault();
        this.renderPageAlbums();
      });
    navList.addChild(navListItemHome);
    navList.addChild(navListItemSongs);
    navList.addChild(navListItemAlbums);
    navMenu.addChild(navList);
    return navMenu;
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

  renderMainFooter() {
    const mainFooter = Html()
      .create('footer')
      .addClass('footer');
    const mainFooterCopy = Html()
      .create('small')
      .addClass('copy')
      .html('&copy; 2019 Muzify');
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }

  renderContentBlock(requestedData) {
    const contentBlock = Html()
      .create('section')
      .addClass('content-block');

    const contentTitle = Html()
      .create('h2')
      .addClass('content-title')
      .text(requestedData);

    const contentList = Html()
      .create('ul')
      .addClass('content-list');

    Api().getRequest(
      `http://localhost:3000/${requestedData}`,
      responseCollection => {
        console.log(requestedData);
        responseCollection.forEach(item => {
          let name;
          if (requestedData === 'artists') {
            name = `${item.firstName} ${item.lastName} `;
          }
          if (requestedData === 'songs') {
            name = `${item.title}`;
          }
          if (requestedData === 'albums') {
            name = `${item.title}`;
          }
          const contentBlockListItem = Html()
            .create('li')
            .addClass('content-block__list-item')
            .addChild(
              Html()
                .create('a')
                .addAttribute('href', `/${requestedData}/${item.id}`)
                .text(name)
                .click(event => {
                  console.log(item);
                  event.preventDefault();
                  const endpoint = event.target.getAttribute('href');
                  const typeOfObject = endpoint.split('/')[1];
                  if (typeOfObject === 'artists') {
                    this.renderPageArtists(data);
                  }
                  if (typeOfObject === 'songs') {
                    this.renderPageBooks(data);
                  }
                  if (typeOfObject === 'albums') {
                    this.renderPageAlbums(data);
                  }

                  Api().getRequest(
                    `http://localhost:3000/${endpoint}`,
                    data => {
                      this.renderPageSingle(data, endpoint);
                    }
                  );
                })
            );
          contentList.addChild(contentBlockListItem);
        });
      }
    );
    contentBlock.addChild(contentTitle);
    contentBlock.addChild(contentList);
    return contentBlock;
  }

  renderMainContent(requestedData) {
    const mainContent = Html()
      .create('main')
      .addClass('content');

    const containerDiv = Html()
      .create('div')
      .addClass('container');

    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
  }

  renderPageArtists() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select('.content')
      .select('.container');
    currentMainContentContainer.replace(this.renderContentBlock('artists'));
    console.log('this is artist');
  }
  renderPageSongs() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select('.content')
      .select('.container');
    currentMainContentContainer.replace(this.renderContentBlock('songs'));
    console.log('this is songs');
  }

  renderPageAlbums() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select('.content')
      .select('.container');
    currentMainContentContainer.replace(this.renderContentBlock('albums'));
    console.log('this is albums');
  }

  renderPageSingle() {
    console.log(endpoint);
    const typeOfObject = endpoint.split('/')[1];
    console.log(typeOfObject);
    if (typeOfObject === 'artists') {
      this.renderPageArtist(data);
    }
    if (typeOfObject === 'songs') {
      this.renderPageBook(data);
    }
    if (typeOfObject === 'albums') {
      this.renderPageAlbum(data);
    }
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const navMenu = this.renderNavMenu();
    const mainContent = this.renderMainContent('artists');
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
