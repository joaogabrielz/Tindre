class IntroductionView {
  template() {
    return `
    <div id="carouselExampleCaptions" class="carousel slide pt-3r carousel-introduction" data-bs-ride="carousel">

        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="rounded-circle active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            class="rounded-circle"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            class="rounded-circle"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <button
          class="carousel-control-prev invisible"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next invisible"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

        <div class="carousel-inner">
          <div class="carousel-item active">

            <div class="side-images side-images-left">
                <img src="assets/imgs/girl2.png" class="" alt="..." />
              </div>

            <div class="side-images side-images-right">
                <img src="assets/imgs/girl3.png" class="" alt="..." />
            </div>

            <img src="assets/imgs/girl1.png" class="" alt="..." />
            <div class="carousel-caption">
              <h5 class="main-color-text fw-bold fs-2">Algorithm</h5>
              <p class="secondary-color-text px-4">
                Users going through a vetting process to ensure you never match
                with bots.
              </p>
            </div>
          </div>


          <div class="carousel-item">

            <div class="side-images side-images-left">
              <img src="assets/imgs/girl3.png" class="" alt="..." />
            </div>

          <div class="side-images side-images-right">
              <img src="assets/imgs/girl1.png" class="" alt="..." />
          </div>

            <img src="assets/imgs/girl2.png" class="" alt="..." />
            <div class="carousel-caption">
              <h5 class="main-color-text fw-bold fs-2">Matches</h5>
              <p class="secondary-color-text px-4">
                We match you with people that have a large array of similar
                interests.
              </p>
            </div>
          </div>


          <div class="carousel-item">

            <div class="side-images side-images-left">
              <img src="assets/imgs/girl1.png" class="" alt="..." />
            </div>

          <div class="side-images side-images-right">
              <img src="assets/imgs/girl2.png" class="" alt="..." />
          </div>


            <img src="assets/imgs/girl3.png" class="" alt="..." />
            <div class="carousel-caption">
              <h5 class="main-color-text fw-bold fs-2">Premium</h5>
              <p class="secondary-color-text px-4">
                Sign up today and enjoy the first month of premium benefits on
                us.
              </p>
            </div>
          </div>
       

        </div>
      </div>

      

      <div class="d-grid gap-4 col-10 mx-auto mt-4r mb-3r text-center justify-content-center">
        <button
        id="signUpBtn"
          class="btn main-color-bg white-color-text fw-bold button-create"
          type="button"
        >
          Create an account
        </button>

        <p class="black-color-text-op70">
          Already have an account?
          <a href="#" id="signInBtn" class="main-color-text">Sign In</a>
        </p>
      </div>
    `;
  }
}
