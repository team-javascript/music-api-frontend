import Components from "./utils/Components/Components";

export default function main() {
  Components().renderPageHome();

  // get context of thing to add html to
  // const app = Html("#app");
  // // build header element to add
  // const header = Html("header").addClass("page-header");
  // // build h1 element to add
  // const h1 = Html("h1")
  //   .addClass("page-header__title")
  //   .text("Musify | Artists");
  // // build nav element to add
  // const nav = Html("nav")
  //   .addClass("nav-list")
  //   .text("Hello");
  // // add 'h1' and 'nav' to 'header'
  // header.addChild(h1);
  // header.addChild(nav);
  // // add 'header' to app 'div'
  // app.addChild(header);
  // Api().getRequest("/artist", artistData => {
  //   console.log(artistData);
  //   app.addChild(
  //     Html("p")
  //       .text(artistData.firstName)
  //       .addClass("artistComponent")
  //   );
  // });
}
