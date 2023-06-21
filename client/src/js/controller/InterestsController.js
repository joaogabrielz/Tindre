class InterestsController {
  constructor() {}

  set setContainer(container) {
    this.container = container;
  }

  set setSelectedItems(items) {
    this.selectedItems = items;
  }

  set setShowingMessage(bool) {
    this.showingMessage = bool;
  }

  init() {
    this.setContainer = document.querySelector("#container");
    let view = new interestsView().template();
    this.setSelectedItems = [];
    this.container.innerHTML = view;

    this.bind();
  }

  bind() {
    document
      .querySelectorAll(".btn-interest")
      .forEach((btn) =>
        btn.addEventListener("click", (e) =>
          this.selectInterest(e.target.closest("div"))
        )
      );
    if (document.querySelector("#btnContinueInterests")) {
      document
        .querySelector("#btnContinueInterests")
        .addEventListener("click", () => {
          this.continue();
        });
    }
    document.querySelector("#skipInterest").addEventListener("click", () => {
      new Router().goToDiscover(true);
    });
  }

  toggleStyleAndSelect(el) {
    const svg = el.querySelector("svg");
    const text = el.querySelector("span");

    if (el.classList.contains("white-color-bg")) {
      el.classList.remove("white-color-bg");
      el.classList.remove("black-color-text");
      el.classList.add("main-color-bg");
      el.classList.add("white-color-text");
      svg.classList.add("fillSvgMainColor");
      text.classList.add("fw-bold");
      this.selectedItems.push(el.dataset.item);
    } else {
      el.classList.remove("main-color-bg");
      el.classList.remove("white-color-text");
      el.classList.add("white-color-bg");
      el.classList.add("black-color-text");
      svg.classList.remove("fillSvgMainColor");
      text.classList.remove("fw-bold");
      const itemIndex = this.selectedItems.findIndex(
        (item) => item === el.dataset.item
      );
      if (itemIndex !== -1) {
        this.selectedItems.splice(itemIndex, 1);
      }
    }
  }

  selectInterest(target) {
    this.toggleStyleAndSelect(target);
  }

  showLoading(interests, showloading = false) {
    let componentLoading = null;
    if (showloading) {
      componentLoading = new LoadingContent().template();
      document.querySelector("#btnContinueInterests").innerHTML = "";
      document.querySelector(".boxInterests").innerHTML = componentLoading;
      return;
    }

    let view = new interestsView(interests).template();

    this.container.innerHTML = view;
    this.bind();
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
      "Ocorreu ao salvar interesses!"
    ).templateError();
  }

  async continue() {
    if (this.selectedItems.length) {
      const interestsJson = JSON.stringify(this.selectedItems);
      let formData = new FormData();
      formData.append("interests", interestsJson);
      this.showLoading(this.selectedItems, true);

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

        new Router().goToDiscover(true);
        return;
      } catch (error) {
        console.error(error);
        this.setShowingMessage = true;
      }

      this.showLoading(this.selectedItems);
      this.showError();
    }
  }
}
