class SignUpInView {
  constructor(signUpIn, activeBtn, signInUpModel = null, componentLoading = null) {
    this.signUpIn = signUpIn;
    this.activeBtn = activeBtn;
    this.signInUpModel = signInUpModel;
    this.componentLoading = componentLoading;
  }

  template() {
    return `
    <section class="d-grid gap-3 col-12 mx-auto mt-4r text-center justify-content-center">

    <span id="alert"></span>

    <span class="">
      <svg width="109" height="100" viewBox="0 0 109 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M66.0387 39.8157C66.0387 39.8157 57.4046 50.0022 60.6529 63.6045C63.9012 77.2068 76.7126 88.2995 93.0039 81.8496C109.295 75.3997 114.146 44.3821 101.369 26.5497C88.5923 8.7173 68.4159 -6.725 36.5658 3.01852C4.71578 12.762 -20.7278 64.8854 24.4193 100C24.4193 100 10.5382 85.0722 11.9093 65.8769C13.2804 46.6815 25.8489 27.0291 49.2717 22.3445C49.2717 22.3445 29.6193 35.3699 29.0481 57.0789C28.4767 78.7879 40.9309 102.668 76.465 99.4685C76.465 99.4685 58.3364 95.1074 52.6743 76.7959C47.0122 58.4843 60.3687 43.6751 66.0387 39.8157Z" fill="url(#paint0_linear_309_5077)"/>
        <path d="M76.465 99.4679C40.9309 102.668 28.4772 78.7878 29.0482 57.0784C29.6052 35.8792 48.361 22.9597 49.2397 22.3659C43.3755 27.8275 34.4945 38.4479 34.1135 52.9373C33.6311 71.288 42.4539 91.1895 66.6573 94.9762C71.9125 98.3728 76.465 99.4679 76.465 99.4679Z" fill="url(#paint1_linear_309_5077)"/>
        <path d="M104.078 71.0804C101.432 76.1051 97.692 79.9956 93.004 81.8502C76.7131 88.2993 63.9012 77.2066 60.6526 63.6046C57.4256 50.0926 65.9255 39.9494 66.0369 39.8165C66.0382 39.8152 66.0382 39.8152 66.0382 39.8152C63.8379 44.0361 61.411 51.0522 63.3885 59.3331C66.637 72.9351 79.4477 84.0278 95.7398 77.5788C98.9908 76.2912 101.788 74.0251 104.078 71.0804Z" fill="url(#paint2_linear_309_5077)"/>
        <defs>
        <linearGradient id="paint0_linear_309_5077" x1="6.41414" y1="79.5517" x2="100.721" y2="25.1039" gradientUnits="userSpaceOnUse">
        <stop offset="0.1" stop-color="#F27121"/>
        <stop offset="0.6" stop-color="#E94057"/>
        <stop offset="1" stop-color="#8A2387"/>
        </linearGradient>
        <linearGradient id="paint1_linear_309_5077" x1="29.38" y1="47.3705" x2="87.2525" y2="80.7833" gradientUnits="userSpaceOnUse">
        <stop offset="2.42203e-07" stop-color="#8A2387"/>
        <stop offset="0.7" stop-color="#8A2387" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="paint2_linear_309_5077" x1="59.9218" y1="61.7751" x2="104.078" y2="61.7751" gradientUnits="userSpaceOnUse">
        <stop stop-color="#8A2387" stop-opacity="0.7"/>
        <stop offset="0.5" stop-color="#8A2387" stop-opacity="0"/>
        </linearGradient>
        </defs>
        </svg>
        
    </span>

    <p class="fw-bold black-color-text mt-4r">Sign ${
      this?.signUpIn ? "in" : "up"
    } to continue</p>

    <div class="formSignInUp d-flex flex-column gap-3 mt-1 mb-4 ${
      !this?.activeBtn ? "d-none" : ""
    }">
      <div class="form-floating">
        <input type="email" class="form-control br-15p" id="floatingInputEmail" placeholder="name@example.com" value="${
          this?.signInUpModel?.email || ""
        }">
        <label for="floatingInputEmail">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control br-15p" id="floatingPassword" placeholder="Password" value="${
          this?.signInUpModel?.password || ""
        }">
        <label for="floatingPassword">Password</label>
      </div>
    </div>

    ${!this.componentLoading ? `
    <section id="ctaContinueSign">
    ${
      !this?.activeBtn
        ? `<button
            id="btnSignInUp"
            class="btn main-color-bg white-color-text fw-bold button-create"
            type="button"
          >
            Continue with email
          </button>`
        : 
          `<button
            id="btnContinueSign"
            class="btn main-color-bg white-color-text fw-bold button-create"
            type="button"
          >
            Continue
          </button`}
    </section>
    ` : this.componentLoading}
   

  </setion>


  <footer class="d-flex gap-4 justify-content-center main-color-text p-4 w-100 footer">
    <p><a href="#">Terms of use</a></p>
    <p><a href="#">Privacy Policy</a></p>
  </footer>
    `;
  }
}
