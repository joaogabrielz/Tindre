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
        controller: new ProfileDetailsController(),
        path: "/profile",
      },
      iam: {
        controller: new IamController(),
        path: "/iam",
      },
      interests: {
        controller: new InterestsController(),
        path: "/interests",
      },
      discover: {
        controller: new DiscoverController(),
        path: "/discover",
      },
    };

  }

  goToIntroduction() {
    this.goTo(this.routes.introduction);
  }

  goToSignUpIn(bool) {
    this.goTo(this.routes.signUpIn, bool);
  }

  goToProfile() {
    this.goTo(this.routes.profile);
  }

  goToIam() {
    this.goTo(this.routes.iam);
  }

  goToInterests() {
    this.goTo(this.routes.interests);
  }

  goToDiscover() {
    this.goTo(this.routes.discover);
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
