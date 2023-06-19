class DiscoverController {
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

  set setRandomUserIndex(index) {
    this.randomIndex = index;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    let view = new DiscoverView().templateNoUsers();
    this.container.innerHTML = view;
    this.setRandomUserIndex = -1;
    this.fetchUsers();
    this.showBorderCurrentMenu();
    this.bind();
  }

  startTimerFetchUsers() {
    this.timer = setInterval(() => {
      this.fetchUsers();
      this.stopTimerFetchUsers();
    }, 60 * 1500);
  }

  stopTimerFetchUsers() {
    clearInterval(this.timer);
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
        this.verifyMatches();
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
        //this.goToMatches() new router gotomatches..;
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
      this.fetchUsers();
      return;
    } catch (error) {
      console.error(error);
      this.showError();
    }
  }

  async verifyMatches() {
    //this.matches
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
    if (!document.querySelector(".box-match").classList.contains("hasmatch")) {
      document.querySelector(".box-match").classList.add("hasmatch");
    }
  }

  unShowNotificationMatch() {
    if (document.querySelector(".box-match").classList.contains("hasmatch")) {
      document.querySelector(".box-match").classList.remove("hasmatch");
    }
  }

  showBorderCurrentMenu(){
    if(!document.querySelector('.box-discover').classList.contains('active')){
      document.querySelector('.box-discover').classList.add('active');
    }
  }

  unShowBorderCurrentMenu(){
    if(document.querySelector('.box-discover').classList.contains('active')){
      document.querySelector('.box-discover').classList.remove('active');
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
      "Ocorreu ao salvar perfil!"
    ).templateError();
  }

  showLoading() {
    document.querySelector(".box-card-actions-view").innerHTML =
      new LoadingContent().template();
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
      this.startTimerFetchUsers();
      let data = await response.json();
      if (data && data?.error) {
        this.showWarning(data.error);
        return;
      }

      if (data && !data?.users?.length) {
        const view = new DiscoverView().templateNoUsers();
        this.container.innerHTML = view;
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
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.users.length);
    } while (newIndex === this.randomIndex);

    this.randomIndex = newIndex;
    const nextRandomUser = this.users[this.randomIndex];

    const birthday = new Date(nextRandomUser.profile.birthday);
    const age = this.getAge(birthday);
    let view = new DiscoverView(nextRandomUser, age).template();
    this.container.innerHTML = view;
    this.bind();
  }
}
