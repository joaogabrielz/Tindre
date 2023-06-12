class IamController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setSelectedGender(selectedGender) {
    this.selectedGender = selectedGender;
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
    document.querySelector("#btnContinueIam").addEventListener("click", () => {
      this.continue();
    });
  }

  chooseGender(target) {
    let gender = target.dataset.gender;
    let iamModel = new Iam(gender, true);
    this.selectedGender = gender;
    let view = new IamView(iamModel).template();
    this.container.innerHTML = view;
    this.bind();
  }

  continue() {
    // fetch??
    if (this.selectedGender) {
      new Router().goToInterests();
    }
  }
}
