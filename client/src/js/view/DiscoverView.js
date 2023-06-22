class DiscoverView {
  constructor(user, age) {
    this.user = user;
    this.age = age;
  }

  template() {
    return `
    <span id="alert"></span>

      <div
        class="nav-header d-flex align-items-center justify-content-between px-4 mb-4 mt-3r"
      >
        <button class="btn-back" disabled>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.20711 13.7071C7.81658 14.0976 7.18342 14.0976 6.79289 13.7071L0.792893 7.70711C0.402369 7.31658 0.402369 6.68342 0.792893 6.29289L6.79289 0.292893C7.18342 -0.0976315 7.81658 -0.0976315 8.20711 0.292893C8.59763 0.683417 8.59763 1.31658 8.20711 1.70711L2.91421 7L8.20711 12.2929C8.59763 12.6834 8.59763 13.3166 8.20711 13.7071Z"
              fill="#E94057"
            />
          </svg>
        </button>
        <div class="d-flex flex-column align-items-center box-title">
          <h2 class="fw-bold m-0">Discover</h2>
          <span class="city">Campo Grande, MS</span>
        </div>
        <button class="btn-settings" disabled>
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.75 0C13.3023 0 13.75 0.447715 13.75 1V5C13.75 5.55228 13.3023 6 12.75 6C12.1977 6 11.75 5.55228 11.75 5V4H1.75C1.19772 4 0.75 3.55228 0.75 3C0.75 2.44772 1.19772 2 1.75 2H11.75V1C11.75 0.447715 12.1977 0 12.75 0ZM15.75 3C15.75 2.44772 16.1977 2 16.75 2H19.75C20.3023 2 20.75 2.44772 20.75 3C20.75 3.55228 20.3023 4 19.75 4H16.75C16.1977 4 15.75 3.55228 15.75 3ZM9.75 7C10.3023 7 10.75 7.44772 10.75 8V9H20.75C21.3023 9 21.75 9.44771 21.75 10C21.75 10.5523 21.3023 11 20.75 11H10.75V12C10.75 12.5523 10.3023 13 9.75 13C9.19772 13 8.75 12.5523 8.75 12V8C8.75 7.44772 9.19772 7 9.75 7ZM0.75 10C0.75 9.44771 1.19772 9 1.75 9H5.75C6.30228 9 6.75 9.44771 6.75 10C6.75 10.5523 6.30228 11 5.75 11H1.75C1.19772 11 0.75 10.5523 0.75 10ZM12.75 14C13.3023 14 13.75 14.4477 13.75 15V19C13.75 19.5523 13.3023 20 12.75 20C12.1977 20 11.75 19.5523 11.75 19V18H1.75C1.19772 18 0.75 17.5523 0.75 17C0.75 16.4477 1.19772 16 1.75 16H11.75V15C11.75 14.4477 12.1977 14 12.75 14ZM15.75 17C15.75 16.4477 16.1977 16 16.75 16H19.75C20.3023 16 20.75 16.4477 20.75 17C20.75 17.5523 20.3023 18 19.75 18H16.75C16.1977 18 15.75 17.5523 15.75 17Z"
              fill="#E94057"
            />
          </svg>
        </button>
      </div>

      <section class="box-card-actions-view">
        <div class="box-users-discover">
        
        <div class="d-flex box-name-user">

        <span class="h3 fw-bold white-color-text mb-0">${
          this.user?.profile?.firstname || this.user?.email || ""
        } ${this.user?.profile?.lastname || ""} ${this.age ? ", " : ""} ${
      this.age || ""
    }</span>
        
        </div>

        <div class="box-data-user">
       <!-- <span class="white-color-text">Profissional model</span> -->    
       <div class="blur-photo"></div>  
      </div>

          <div class="card-user">
            <img src="${
              this.user?.profile?.profile_pic || "assets/imgs/avatar.png"
            }" alt="image user" />
                   
          </div> 
        </div>

        <div
          class="d-flex align-items-center justify-content-center gap-4 mt-4 pb-4r"
        >
          <button id="btnDeslike" class="sideBtnDiscover">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.86612 1.86612C2.35427 1.37796 3.14573 1.37796 3.63388 1.86612L9 7.23223L14.3661 1.86612C14.8543 1.37796 15.6457 1.37796 16.1339 1.86612C16.622 2.35427 16.622 3.14573 16.1339 3.63388L10.7678 9L16.1339 14.3661C16.622 14.8543 16.622 15.6457 16.1339 16.1339C15.6457 16.622 14.8543 16.622 14.3661 16.1339L9 10.7678L3.63388 16.1339C3.14573 16.622 2.35427 16.622 1.86612 16.1339C1.37796 15.6457 1.37796 14.8543 1.86612 14.3661L7.23223 9L1.86612 3.63388C1.37796 3.14573 1.37796 2.35427 1.86612 1.86612Z"
                fill="#F27121"
                stroke="#F27121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button id="btnLike" class="btnLike">
            <svg
              width="45"
              height="39"
              viewBox="0 0 45 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9375 1.5C6.48267 1.5 1.25 6.73271 1.25 13.1875C1.25 24.875 15.0625 35.5 22.5 37.9716C29.9375 35.5 43.75 24.875 43.75 13.1875C43.75 6.73271 38.5173 1.5 32.0625 1.5C28.1097 1.5 24.6151 3.46233 22.5 6.46591C20.3849 3.46233 16.8903 1.5 12.9375 1.5Z"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button id="btnSuperLike" class="sideBtnDiscover">
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9991 1.125L10.1785 8.9235L1.5 10.1819L7.78681 16.3282L6.284 24.875L13.9991 20.762L21.7159 24.875L20.2241 16.3282L26.5 10.1819L17.8696 8.9235L13.9991 1.125Z"
                fill="#8A2387"
                stroke="#8A2387"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      ${new navOptions().template()}
    `;
  }

  templateNoUsers() {
    return `
    <span id="alert"></span>

    <div
      class="nav-header d-flex align-items-center justify-content-between px-4 mb-4 mt-3r"
    >
      <button class="btn-back" disabled>
        <svg
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.20711 13.7071C7.81658 14.0976 7.18342 14.0976 6.79289 13.7071L0.792893 7.70711C0.402369 7.31658 0.402369 6.68342 0.792893 6.29289L6.79289 0.292893C7.18342 -0.0976315 7.81658 -0.0976315 8.20711 0.292893C8.59763 0.683417 8.59763 1.31658 8.20711 1.70711L2.91421 7L8.20711 12.2929C8.59763 12.6834 8.59763 13.3166 8.20711 13.7071Z"
            fill="#E94057"
          />
        </svg>
      </button>
      <div class="d-flex flex-column align-items-center box-title">
        <h2 class="fw-bold m-0">Discover</h2>
      </div>
      <button class="btn-settings" disabled>
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.75 0C13.3023 0 13.75 0.447715 13.75 1V5C13.75 5.55228 13.3023 6 12.75 6C12.1977 6 11.75 5.55228 11.75 5V4H1.75C1.19772 4 0.75 3.55228 0.75 3C0.75 2.44772 1.19772 2 1.75 2H11.75V1C11.75 0.447715 12.1977 0 12.75 0ZM15.75 3C15.75 2.44772 16.1977 2 16.75 2H19.75C20.3023 2 20.75 2.44772 20.75 3C20.75 3.55228 20.3023 4 19.75 4H16.75C16.1977 4 15.75 3.55228 15.75 3ZM9.75 7C10.3023 7 10.75 7.44772 10.75 8V9H20.75C21.3023 9 21.75 9.44771 21.75 10C21.75 10.5523 21.3023 11 20.75 11H10.75V12C10.75 12.5523 10.3023 13 9.75 13C9.19772 13 8.75 12.5523 8.75 12V8C8.75 7.44772 9.19772 7 9.75 7ZM0.75 10C0.75 9.44771 1.19772 9 1.75 9H5.75C6.30228 9 6.75 9.44771 6.75 10C6.75 10.5523 6.30228 11 5.75 11H1.75C1.19772 11 0.75 10.5523 0.75 10ZM12.75 14C13.3023 14 13.75 14.4477 13.75 15V19C13.75 19.5523 13.3023 20 12.75 20C12.1977 20 11.75 19.5523 11.75 19V18H1.75C1.19772 18 0.75 17.5523 0.75 17C0.75 16.4477 1.19772 16 1.75 16H11.75V15C11.75 14.4477 12.1977 14 12.75 14ZM15.75 17C15.75 16.4477 16.1977 16 16.75 16H19.75C20.3023 16 20.75 16.4477 20.75 17C20.75 17.5523 20.3023 18 19.75 18H16.75C16.1977 18 15.75 17.5523 15.75 17Z"
            fill="#E94057"
          />
        </svg>
      </button>
    </div>

    <section class="box-card-actions-view">
      <div class="box-users-discover anyone-tosee">
        <div class="card-user">
          <img src="assets/imgs/avatar.png" alt="image user" />
        </div>
        <div class="box-no-data text-center">
          <p class="fw-bold h5 mt-4">Não há ninguem perto de você</p>       
        </div>
      </div>

    </section>

    ${new navOptions().template()}
    `;
  }
}
