class MatchesController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setUsers(users) {
    this.users = users;
  }

  set setTimer(timer) {
    this.timer = timer;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    this.container.innerHTML = "";
    let view = new MatchesView().templateNoContent();
    this.container.innerHTML = view;

    this.fetchUsers();
    this.bind();
  }

  bind() {

    if (document.querySelector(".box-discover")) {
      document.querySelector(".box-discover").addEventListener("click", () => {
       this.unShowBorderCurrentMenu();
        this.stopTimerFetchUsers();
        new Router().goToDiscover();
      });
    }
    if (document.querySelector(".box-profile-op")) {
      document
        .querySelector(".box-profile-op")
        .addEventListener("click", () => {
          this.showMessage();
        });
    }
  }

  showMessage() {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox("Modulo em contrução").template();
  }

  showBorderCurrentMenu() {
    if (!document.querySelector(".box-match").classList.contains("active")) {
      document.querySelector(".box-match").classList.add("active");
      document.querySelector(".box-match").classList.add("colorizeSvgClick");
    }
  }

  unShowBorderCurrentMenu() {
    if (document.querySelector(".box-match").classList.contains("active")) {
      document.querySelector(".box-match").classList.remove("active");
      document.querySelector(".box-match").classList.remove("colorizeSvgClick");
    }
  }

  showLoading() {
    if (document.querySelector(".boxMatches")) {
      document.querySelector(".boxMatches").innerHTML =
        new LoadingContent().template();
    }
  }

  showWarning(msg) {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox(
      msg || "Ops algo deu errado"
    ).templateWarning();
  }

  showError() {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox(
      "Ocorreu um Erro"
    ).templateError();
  }

  startTimerFetchUsers() {
    this.timer = setInterval(() => {
      this.fetchUsers();
      this.stopTimerFetchUsers();
    }, 60 * 3000);
  }

  stopTimerFetchUsers() {
    clearInterval(this.timer);
  }

  async fetchUsers() {
    this.showLoading();

    try {
      let response = await fetch("http://localhost:3000/users/me/matches", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
        method: "GET",
      });
      this.startTimerFetchUsers();
      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }

      if (data && !data?.matches.length) {
        const view = new MatchesView().templateNoMatches();
        this.container.innerHTML = view;
        this.bind();
        this.showBorderCurrentMenu();
        return;
      }

      this.users = data.matches;
      this.renderUsers();
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  renderUsers() {
    this.container.innerHTML = "";
    let view = new MatchesView(this.users).template();
    this.container.innerHTML = view;
    this.bind();
    this.showBorderCurrentMenu();
  }
}
