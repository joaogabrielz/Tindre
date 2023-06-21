class SignUpInController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setSignUpIn(bool) {
    this.signUpIn = bool;
  }

  set setBtnFormActive(bool) {
    this.btnFormActive = bool;
  }

  set setShowingMessage(bool) {
    this.showingMessage = bool;
  }

  init(login = false) {
    this.setContainer = document.querySelector("#container");

    this.setSignUpIn = login;
    this.setBtnFormActive = false;

    let signUpInModel = new SignUpIn("", "");

    const view = new SignUpInView(
      this.signUpIn,
      this.btnFormActive,
      signUpInModel
    ).template();

    this.container.innerHTML = view;
    this.bind();
  }

  bind() {
    if (document.querySelector("#btnSignInUp")) {
      document.querySelector("#btnSignInUp").addEventListener("click", () => {
        this.signInUp();
      });
    }
    if (document.querySelector("#btnContinueSign")) {
      document
        .querySelector("#btnContinueSign")
        .addEventListener("click", () => {
          this.continue();
        });

      document.addEventListener("keypress", (e) => {
        if (e.key == 'Enter') {
          this.continue();
        }
      });

      document
        .querySelector("#floatingInputEmail")
        .addEventListener("input", () => {
          this.validate();
        });
      document
        .querySelector("#floatingPassword")
        .addEventListener("input", () => {
          this.validate();
        });
    }
  }

  signInUp() {
    const email = document.querySelector("#floatingInputEmail").value;
    const password = document.querySelector("#floatingPassword").value;

    let signUpInModel = new SignUpIn(email, password);
    this.setBtnFormActive = !this.btnFormActive;

    const view = new SignUpInView(
      this.signUpIn,
      this.btnFormActive,
      signUpInModel
    ).template();
    this.container.innerHTML = view;
    this.bind();
  }

  validate() {
    const email = document.querySelector("#floatingInputEmail");
    const password = document.querySelector("#floatingPassword");

    if (!this.validateEmail(email.value)) {
      this.addInvalidClassesFrom(email);
    } else {
      this.addValidClassesFrom(email);
    }

    if (!this.validatePassword(password.value)) {
      this.addInvalidClassesFrom(password);
    } else {
      this.addValidClassesFrom(password);
    }

    if (
      this.validateEmail(email.value) &&
      this.validatePassword(password.value)
    ) {
      return true;
    }
    return false;
  }

  addInvalidClassesFrom(inputHtml) {
    if (!inputHtml.classList.contains("is-invalid")) {
      inputHtml.classList.add("is-invalid");
    }
  }

  addValidClassesFrom(inputHtml) {
    if (inputHtml.classList.contains("is-invalid")) {
      inputHtml.classList.remove("is-invalid");
    }
  }

  validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  validatePassword(password) {
    const regex = /^.{5,}$/;
    return regex.test(password);
  }

  showLoading(email, password, showloading = false) {
    let componentLoading = null;
    if (showloading) {
      componentLoading = new LoadingContent().template();
    }
    let signUpInModel = new SignUpIn(email, password);

    const view = new SignUpInView(
      this.signUpIn,
      this.btnFormActive,
      signUpInModel,
      componentLoading
    ).template();

    this.container.innerHTML = view;
    this.bind();
  }

  async continue() {
    const isValidForm = this.validate();

    if (isValidForm) {
      const email = document.querySelector("#floatingInputEmail").value;
      const password = document.querySelector("#floatingPassword").value;
      this.showLoading(email, password, true);

      try {
        const body = {
          email,
          password,
        };

        let response = await fetch("http://localhost:3000/users/sign-in", {
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        });
        let data = await response.json();
        if (data && data?.error) {
          this.signUp(body);
          return;
        }
        if (data && data?.token) {
          sessionStorage.setItem("token", data.token);

          this.verifyUserProfileData();
          return;
        }
      } catch (error) {
        console.error(error);
        this.setShowingMessage = true;
      }

      this.showLoading(email, password);
      this.showError();
    }
  }

  async verifyUserProfileData() {
    try {
      let response = await fetch("http://localhost:3000/users/me", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
        method: "GET",
      });
      let data = await response.json();
      if (data && data?.user) {
        if (!data.user.profile?.firstname || !data.user.profile?.lastname) {
          new Router().goToProfile();
        } else {
          new Router().goToDiscover(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  showError(msg) {
    if (this.showingMessage) {
      let boxAlert = document.querySelector("#alert");
      boxAlert.innerHTML = "";
      boxAlert.innerHTML = new ErrorBox(
        msg || "Ops Algo deu errado!"
      ).templateError();
      this.setShowingMessage = false;
    }
  }

  async signUp(body) {
    this.showLoading(body.email, body.password, true);
    try {
      let response = await fetch("http://localhost:3000/users/sign-up", {
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      let data = await response.json();
      if (data && data?.token) {
        sessionStorage.setItem("token", data.token);
        new Router().goToProfile();
        return;
      }
    } catch (error) {
      console.error(error);
      this.setShowingMessage = true;
    }
    this.showLoading(body.email, body.password);
    this.showError("Ops erro ao cadastrar!");
  }
}
