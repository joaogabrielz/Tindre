class IntroductionController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    const view = new IntroductionView().template();
    this.container.innerHTML = view;

    document.querySelector("#signUpBtn").addEventListener("click", () => {
      new Router().goToSignUpIn();
    });

    document.querySelector("#signInBtn").addEventListener("click", () => {
      new Router().goToSignUpIn(true);
    });
  }
}
