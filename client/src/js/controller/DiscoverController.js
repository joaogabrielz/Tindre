class DiscoverController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setUsers(users) {
    this.users = users;
  }

  set setRandomUserIndex(index) {
    this.randomIndex = index;
  }

  set setAuthUser(data) {
    this.authUser = data;
  }

  init(firstTime = false) {
    this.setContainer = document.querySelector("#container");
    let view = new DiscoverView().templateNoUsers();
    this.container.innerHTML = view;
    this.setCanShowNotifyMatch = true;
    this.fetchMe();
    this.setRandomUserIndex = 0;
    this.fetchUsers();
    this.bind();
    if (firstTime) {
      this.verifyMatches();
    }
  }

  async fetchMe() {
    this.showLoading();

    try {
      let response = await fetch("http://localhost:3000/users?user=me", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
        method: "GET",
      });

      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }

      if (data && !data?.user?.id) {
        this.showError();
        return;
      }

      this.setAuthUser = data;
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  bind() {
    if (document.querySelector("#btnDeslike")) {
      document.querySelector("#btnDeslike").addEventListener("click", () => {
        this.deslike();
      });
    }
    if (document.querySelector("#btnLike")) {
      document.querySelector("#btnLike").addEventListener("click", () => {
        this.like();
      });
    }
    if (document.querySelector("#btnSuperLike")) {
      document.querySelector("#btnSuperLike").addEventListener("click", () => {
        this.like();
      });
    }
    if (document.querySelector(".box-match")) {
      document.querySelector(".box-match").addEventListener("click", () => {
        this.unShowNotificationMatch();
        this.unShowBorderCurrentMenu();
        new Router().goToMatches();
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

  async deslike() {
    this.showLoading();
    const showingUserId = this.users[this.randomIndex]._id;

    try {
      let response = await fetch(
        `http://localhost:3000/users/${showingUserId}/deslikes`,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
          method: "POST",
        }
      );
      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }
      this.fetchUsers();
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  async like() {
    this.showLoading();
    const showingUserId = this.users[this.randomIndex]._id;

    try {
      let response = await fetch(
        `http://localhost:3000/users/${showingUserId}/matches`,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
          method: "POST",
        }
      );
      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }

      if (data && data?.match) {
        const user1 = this.authUser.user;
        const user2 = this.users[this.randomIndex];
        const payload = {
          user1: user1,
          user2: user2,
        };

        new Router().goToItsMatch(payload);
        return;
      }

      this.fetchUsers();
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  async verifyMatches() {
    try {
      let response = await fetch(`http://localhost:3000/users/me/matches`, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
        method: "GET",
      });
      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }
      if (data && data?.matches && data.matches?.length) {
        this.showNotificationMatch();
        return;
      }
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  showNotificationMatch() {
    if (document.querySelector(".box-match")) {
      if (
        !document.querySelector(".box-match").classList.contains("hasmatch")
      ) {
        document.querySelector(".box-match").classList.add("hasmatch");
      }
    }
  }

  unShowNotificationMatch() {
    if (document.querySelector(".box-match")) {
      if (document.querySelector(".box-match").classList.contains("hasmatch")) {
        document.querySelector(".box-match").classList.remove("hasmatch");
      }
    }
  }

  showBorderCurrentMenu() {
    if (document.querySelector(".box-discover")) {
      if (
        !document.querySelector(".box-discover").classList.contains("active")
      ) {
        document.querySelector(".box-discover").classList.add("active");
        document
          .querySelector(".box-discover")
          .classList.add("colorizeSvgClick");
      }
    }
  }

  unShowBorderCurrentMenu() {
    if (document.querySelector(".box-discover")) {
      if (
        document.querySelector(".box-discover").classList.contains("active")
      ) {
        document.querySelector(".box-discover").classList.remove("active");
        document
          .querySelector(".box-discover")
          .classList.remove("colorizeSvgClick");
      }
    }
  }

  showMessage() {
    if (document.querySelector("#alert")) {
      let boxAlert = document.querySelector("#alert");
      boxAlert.innerHTML = "";
      boxAlert.innerHTML = new ErrorBox("Modulo em contrução").template();
    }
  }

  showWarning(msg) {
    if (document.querySelector("#alert")) {
      let boxAlert = document.querySelector("#alert");
      boxAlert.innerHTML = "";
      boxAlert.innerHTML = new ErrorBox(
        msg || "Ops algo deu errado"
      ).templateWarning();
    }
  }

  showError() {
    if (document.querySelector("#alert")) {
      let boxAlert = document.querySelector("#alert");
      boxAlert.innerHTML = "";
      boxAlert.innerHTML = new ErrorBox("Ocorreu um erro!").templateError();
    }
  }

  showLoading() {
    if (document.querySelector(".box-card-actions-view")) {
      document.querySelector(".box-card-actions-view").innerHTML =
        new LoadingContent().template();
    }
  }

  async fetchUsers() {
    this.showLoading();

    try {
      let response = await fetch("http://localhost:3000/users", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
        method: "GET",
      });

      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }

      if (data && !data?.users?.length) {
        const view = new DiscoverView().templateNoUsers();
        this.container.innerHTML = view;
        this.bind();
        this.showBorderCurrentMenu();
        return;
      }

      this.users = data.users;
      this.renderUser();
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  getAge(birthday) {
    const birthYear = new Date(birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  }

  renderUser() {
    let nextRandomUser;
    if (this.users.length > 2) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.users.length);
      } while (newIndex === this.randomIndex);
      this.randomIndex = newIndex;
      nextRandomUser = this.users[this.randomIndex];
    } else {
      nextRandomUser = this.users[0];
      this.randomIndex = 0;
    }
    let age = null;
    if (nextRandomUser?.profile?.birthday) {
      const birthday = new Date(nextRandomUser.profile.birthday);
      age = this.getAge(birthday);
    }
    let view = new DiscoverView(nextRandomUser, age).template();
    this.container.innerHTML = view;
    this.bind();
    this.showBorderCurrentMenu();
  }
}
