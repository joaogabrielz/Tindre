class ItsMatchController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  init(dataUsers) {
    this.setContainer = document.querySelector("#container");
    let view = new ItsMatchView(dataUsers).template();
    this.container.innerHTML = view;
    this.bind();
  }

  bind() {
    if (document.querySelector("#btnHello")) {
      document.querySelector("#btnHello").addEventListener("click", () => {
        new Router().goToMatches();
      });
    }
    if (document.querySelector("#btnKeepSwiping")) {
      document
        .querySelector("#btnKeepSwiping")
        .addEventListener("click", () => {
          new Router().goToDiscover();
        });
    }
  }
}
