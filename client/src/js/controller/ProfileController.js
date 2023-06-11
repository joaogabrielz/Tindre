class ProfileController {
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
    let view = new ProfileView().template();
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

  showLoading(firstname, lastname, birthdate, avatar, showloading = false) {
    let componentLoading = null;
    if (showloading) {
      componentLoading = new LoadingContent().template();
    }
    let profileModel = new Profile(firstname, lastname, birthdate, avatar);

    const view = new ProfileView(profileModel, componentLoading).template();

    this.container.innerHTML = view;
    this.bind();
  }

  async confirm() {
    // isValidForm = validate

    // if isValidForm

    const firstname = document.querySelector("#floatingInputFirstName").value;
    const lastname = document.querySelector("#floatingInputLastName").value;
    const birthdate = document.querySelector("#floatingInputDate").value;

    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("birthdate", birthdate);
    if (this.inputFile.files && this.inputFile.files[0]) {
      formData.append("avatar", this.inputFile.files[0]);
    }
    
    this.showLoading(
      firstname,
      lastname,
      birthdate,
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
      // next tela
      //  new Router().goToProfile();
      return;
    } catch (error) {
      console.error(error);
      this.setShowingMessage = true;
    }

    this.showLoading(
      firstname,
      lastname,
      birthdate,
      this.avatarPreview.src
    );
    this.showError();
  }
}
