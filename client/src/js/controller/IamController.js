class IamController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setSelectedGender(selectedGender) {
    this.selectedGender = selectedGender;
  }

  set setShowingMessage(bool) {
    this.showingMessage = bool;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    let view = new IamView().template();
    this.container.innerHTML = view;
    this.setSelectedGender = null;
    this.bind();
  }

  bind() {
    document
      .querySelectorAll(".button-gender")
      .forEach((btn) =>
        btn.addEventListener("click", (e) => this.chooseGender(e.target))
      );
    if (document.querySelector("#btnContinueIam")) {
      document
        .querySelector("#btnContinueIam")
        .addEventListener("click", () => {
          this.continue();
        });
    }
  }

  chooseGender(target) {
    let gender = target.dataset.gender;
    let iamModel = new Iam(gender, true);
    this.selectedGender = gender;
    let view = new IamView(iamModel).template();
    this.container.innerHTML = view;
    this.bind();
  }

  showLoading(gender, showloading = false) {
    let componentLoading = null;
    if (showloading) {
      componentLoading = new LoadingContent().template();
    }
    let iamModel = new Iam(gender, true);
    let view = new IamView(iamModel, componentLoading).template();

    this.container.innerHTML = view;
    this.bind();
  }

  showError() {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox(
      "Ocorreu ao salvar perfil!"
    ).templateError();
  }

  async continue() {
    if (this.selectedGender) {
      const gender = this.selectedGender;

      let formData = new FormData();
      formData.append("gender", gender);
      this.showLoading(gender, true);

      try {
        let response = await fetch("http://localhost:3000/users/me", {
          body: formData,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          method: "PUT",
        });
        let data = await response.json();
        if (data && data?.error) {
          this.showWarning(data.error);
          return;
        }
        new Router().goToInterests();
        return;
      } catch (error) {
        console.error(error);
        this.setShowingMessage = true;
      }

      this.showLoading(gender);
      this.showError();
    }
  }
}
