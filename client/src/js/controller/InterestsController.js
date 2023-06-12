class InterestsController {

  constructor(){

  }

  set setContainer(container) {
    this.container = container;
  }


  init(){
    this.setContainer = document.querySelector("#container");
    let view = new interestsView().template();
    this.container.innerHTML = view;

    // this.bind();
  }
}