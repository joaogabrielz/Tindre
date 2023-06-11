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
      this.addInValidClassesEmail(email);
    } else {
      this.addValidClassesEmail(email);
    }

    if (!this.validatePassword(password.value)) {
      this.addInvalidClassesPassword(password);
    } else {
      this.addValidClassesPassword(password);
    }

    if (
      this.validateEmail(email.value) &&
      this.validatePassword(password.value)
    ) {
      return true;
    }
    return false;
  }

  addInvalidClassesPassword(password) {
    if (!password.classList.contains("is-invalid")) {
      password.classList.add("is-invalid");
    }
  }

  addValidClassesPassword(password) {
    if (password.classList.contains("is-invalid")) {
      password.classList.remove("is-invalid");
    }
  }

  addInValidClassesEmail(email) {
    if (!email.classList.contains("is-invalid")) {
      email.classList.add("is-invalid");
    }
  }

  addValidClassesEmail(email) {
    if (email.classList.contains("is-invalid")) {
      email.classList.remove("is-invalid");
    }
  }

  validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  validatePassword(password) {
    const regex = /^.{6,}$/;
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
          new Router().goToProfile();
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

  showError(msg) {
    if(this.showingMessage){
      let boxAlert = document.querySelector("#alert");
      boxAlert.innerHTML = "";
      boxAlert.innerHTML = new ErrorBox(msg || "Ops Algo deu errado!").templateError();
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
