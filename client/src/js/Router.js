class Router {
  constructor() {
    this.routes = {
      introduction: {
        controller: new IntroductionController(),
        path: "/",
      },
      signUpIn: {
        controller: new SignUpInController(),
        path: "/signUpIn",
      },
      profile: {
        controller: new ProfileController(),
        path: "/profile",
      },
    };

  }

  goToIntroduction() {
    this.goTo(this.routes.introduction);
  }

  goToSignUpIn(bool) {
    this.goTo(this.routes.signUpIn, bool);
  }

  goToProfile(bool) {
    this.goTo(this.routes.profile, bool);
  }


  goTo(route, bool = false) {
    route.controller.init(bool);   

    if (window.location.protocol === "file:") {
      //this.runningLocal = true;
    } else {
      //this.runningLocal = false;
      //this.lastRoute = route;
      history.pushState({}, "",  route.path);
      //this.bind()
    }
  }

  // bind(){
  //   --disable-ipc-flooding-protection
  //   window.addEventListener("popstate", (event) => {
  //     history.back();
  //     this.goTo(this.lastRoute)
  //   });
  // }
}
