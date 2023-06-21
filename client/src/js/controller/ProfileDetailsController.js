class ProfileDetailsController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setAvatarPreview(avatarPreview) {
    this.avatarPreview = avatarPreview;
  }

  set setInputFile(inputFile) {
    this.inputFile = inputFile;
  }

  set setShowingMessage(bool) {
    this.showingMessage = bool;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    let view = new ProfileDetailsView().template();
    this.container.innerHTML = view;

    this.bind();
  }

  bind() {
    this.setInputFile = document.querySelector("#avatar");
    this.setAvatarPreview = document.querySelector("#avatar-preview");

    this.avatarPreview.addEventListener("click", () => {
      this.inputFile.click();
    });

    this.inputFile.addEventListener("change", () => {
      this.showPreview();
    });

    if (document.querySelector("#btnConfirmProfile")) {
      document
        .querySelector("#btnConfirmProfile")
        .addEventListener("click", () => {
          this.confirm();
        });
    }

    document
      .querySelector("#floatingInputFirstName")
      .addEventListener("input", () => {
        this.validate();
      });

    document
      .querySelector("#floatingInputLastName")
      .addEventListener("input", () => {
        this.validate();
      });
    document
      .querySelector("#floatingInputDate")
      .addEventListener("input", () => {
        this.validate();
      });
  }

  showPreview() {
    if (this.inputFile.files && this.inputFile.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(this.inputFile.files[0]);
    }
  }

  showError() {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox(
      "Ocorreu ao salvar perfil!"
    ).templateError();
  }

  showWarning(msg) {
    let boxAlert = document.querySelector("#alert");
    boxAlert.innerHTML = "";
    boxAlert.innerHTML = new ErrorBox(
      msg || "Ops algo deu errado"
    ).templateWarning();
  }

  showLoading(firstname, lastname, birthday, avatar, showloading = false) {
    let componentLoading = null;
    if (showloading) {
      componentLoading = new LoadingContent().template();
    }
    let profileModel = new Profile(firstname, lastname, birthday, avatar);

    const view = new ProfileDetailsView(
      profileModel,
      componentLoading
    ).template();

    this.container.innerHTML = view;
    this.bind();
  }

  validateName(name) {
    const regex = /^[A-Za-z]{3,}$/;
    return regex.test(name);
  }

  validateDate(date) {
    const regex = /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
    const inputDate = new Date(date);

    if (!regex.test(date)) {
      return false;
    }

    if (isNaN(inputDate.getTime())) {
      return false;
    }

    const currentDate = new Date();
    const minYear = currentDate.getFullYear() - 80;
    const minDate = new Date(minYear, 0, 1);

    if (inputDate > currentDate || inputDate < minDate) {
      return false;
    }

    return true;
  }

  validate() {
    const firstname = document.querySelector("#floatingInputFirstName");
    const lastname = document.querySelector("#floatingInputLastName");
    const birthday = document.querySelector("#floatingInputDate");

    if (!this.validateName(firstname.value)) {
      this.addInvalidClassesFrom(firstname);
    } else {
      this.addValidClassesFrom(firstname);
    }

    if (!this.validateName(lastname.value)) {
      this.addInvalidClassesFrom(lastname);
    } else {
      this.addValidClassesFrom(lastname);
    }

    if (!this.validateDate(birthday.value)) {
      this.addInvalidClassesFrom(birthday);
    } else {
      this.addValidClassesFrom(birthday);
    }

    if (
      this.validateName(firstname.value) &&
      this.validateName(lastname.value) &&
      this.validateDate(birthday.value)
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

  async confirm() {
    const isValidForm = this.validate();

    if (isValidForm) {
      const firstname = document.querySelector("#floatingInputFirstName").value;
      const lastname = document.querySelector("#floatingInputLastName").value;
      const birthday = document.querySelector("#floatingInputDate").value;

      let formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("birthday", birthday);
      if (this.inputFile.files && this.inputFile.files[0]) {
        formData.append("avatar", this.inputFile.files[0]);
      }

      this.showLoading(
        firstname,
        lastname,
        birthday,
        this.avatarPreview.src,
        true
      );

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

        new Router().goToIam();
        return;
      } catch (error) {
        console.error(error);
        this.setShowingMessage = true;
      }

      this.showLoading(firstname, lastname, birthday, this.avatarPreview.src);
      this.showError();
    }
  }
}
