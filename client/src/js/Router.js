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
        params: null,
      },
      matches: {
        controller: new MatchesController(),
        path: "/matches",
      },
      itsMatch: {
        controller: new ItsMatchController(),
        path: "/itsMatch",
        params: null,
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

  goToDiscover(firstTime = false) {
    if (firstTime) {
      this.routes.discover.params = firstTime;
    }
    this.goTo(this.routes.discover);
  }

  goToMatches() {
    this.goTo(this.routes.matches);
  }

  goToItsMatch(payload) {
    this.routes.itsMatch.params = payload;
    this.goTo(this.routes.itsMatch);
  }

  goTo(route, bool = false) {
    if (route.params) {
      route.controller.init(route.params);
    }
    route.controller.init(bool);

    if (window.location.protocol === "file:") {
    } else {
      history.pushState({}, "", route.path);
    }
  }
}
