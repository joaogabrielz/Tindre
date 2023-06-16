class InterestsController {

  constructor(){

  }

  set setContainer(container) {
    this.container = container;
  }

  set setSelectedItems(items) {
    this.selectedItems = items;
  }


  init(){
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
        btn.addEventListener("click", (e) => this.selectInterest(e.target.closest("div")))
      );
    if (document.querySelector("#btnContinueInterests")) {
      document
        .querySelector("#btnContinueInterests")
        .addEventListener("click", () => {
          //this.continue();
        });
    }
  }

  toggleClassSelected(el){
    if(el.classList.contains('white-color-bg')){
      el.classList.remove('white-color-bg')
      el.classList.remove('black-color-text')
      el.classList.add('main-color-bg')
      el.classList.add('white-color-text')
    }
    else{
      el.classList.remove('main-color-bg')
      el.classList.remove('white-color-text')
      el.classList.add('white-color-bg')
      el.classList.add('black-color-text')
    }

  }

  selectInterest(target) {
    let nameItem = target.dataset.item;
    console.log(target)
    this.toggleClassSelected(target);
    

    //let view = new interestsView().template();
    //this.container.innerHTML = view;
    //this.bind();
  }
}