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
      .addAnchor("/#", "Home")
      .click(event => {
        event.preventDefault();
        this.renderPageHome();
      });

    const navListItemSongs = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Songs")
      .click(event => {
        event.preventDefault();
        this.renderPageSongs();
      });
    const navListItemAlbums = Html()
      .create("li")
      .addClass("nav-menu__list-item")
      .addAnchor("/#", "Albums")
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
      .addClass("content-title")
      .text(requestedData);

    const contentList = Html()
      .create("ul")
      .addClass("content-list");

    Api().getRequest(
      `http://localhost:3000/${requestedData}`,
      responseCollection => {
        responseCollection.forEach(item => {
          let name;
          if (requestedData === "artists") {
            name = `${item.firstName} ${item.lastName} `;
          }
          if (requestedData === "songs") {
            name = `${item.title}`;
          }
          if (requestedData === "albums") {
            name = `${item.title}`;
          }
          const contentBlockListItem = Html()
            .create("li")
            .addClass("content-block__list-item")
            .addChild(
              Html()
                .create("a")
                .addAttribute("href", `${requestedData}/${item._id}`)
                .text(name)
                .click(event => {
                  event.preventDefault();

                  const endpoint = event.target.getAttribute("href");
                  Api().getRequest(
                    `http://localhost:3000/${endpoint}`,
                    data => {
                      const typeOfObject = endpoint.split("/")[0];
                      if (typeOfObject === "artists") {
                        this.renderPageArtist(data);
                      }
                      if (typeOfObject === "songs") {
                        this.renderPageSong(data);
                      }
                      if (typeOfObject === "albums") {
                        this.renderPageAlbum(data);
                      }
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
      .create("main")
      .addClass("content");

    const containerDiv = Html()
      .create("div")
      .addClass("container");

    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
  }

  renderPageAlbums() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("albums"));
  }

  renderPageArtists() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("artists"));
  }

  renderPageSongs() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");
    currentMainContentContainer.replace(this.renderContentBlock("songs"));
  }

  renderPageAlbum(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const albumTitle = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.title);

    const albumSongs = Html()
      .create("ul")
      .addClass("album__song-list");
    data.songList.forEach(song => {
      const songElement = Html()
        .create("li")
        .addChild(
          Html()
            .create("a")
            .addAttribute("href", `/songs/${song._id}`)
            .text(song.title)
        );
      albumSongs.addChild(songElement);
    });
    currentMainContentContainer.replace(albumTitle);
    currentMainContentContainer.addChild(albumSongs);
  }

  renderPageArtist(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const artistName = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.firstName + " " + data.lastName);

    const albums = Html()
      .create("ul")
      .addClass("album-list");
    data.albumList.forEach(album => {
      const albumElement = Html()
        .create("li")
        .addChild(
          Html()
            .create("a")
            .addAttribute("href", `/albums/${album._id}`)
            .text(album.title)
        );
      albums.addChild(albumElement);
    });
    currentMainContentContainer.replace(artistName);
    currentMainContentContainer.addChild(albums);
  }

  renderPageSong(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");
    const albumTitle = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.title);
    currentMainContentContainer.replace(albumTitle);
  }

  renderPageSingle(data, endpoint) {
    const typeOfObject = endpoint.split("/")[1];
    if (typeOfObject === "artists") {
      this.renderPageArtist(data);
    }
    if (typeOfObject === "songs") {
      this.renderPageSong(data);
    }
    if (typeOfObject === "albums") {
      this.renderPageAlbum(data);
    }
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const navMenu = this.renderNavMenu();
    const mainContent = this.renderMainContent("artists");
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
