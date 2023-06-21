class ItsMatchView {
  constructor(dataUsers = null) {
    this.dataUsers = dataUsers;
  }

  template() {
    return `
    <div class="px-3 box-its-match mt-4r">

    <section class="its-match-imgs mb-4r">
      <div class="person1" style="background-image: url(${
        this.dataUsers?.user1?.profile.profile_pic || "assets/imgs/girl1.png"
      })">
        <div class="icon1">
          <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.25758 3.6135C3.405 4.29281 0.832557 7.96666 1.51187 11.8192C2.74188 18.795 12.1041 23.6829 16.8033 24.3753C20.9823 22.1174 28.1081 14.3222 26.8781 7.34647C26.1988 3.49391 22.525 0.921446 18.6724 1.60076C16.3131 2.01676 14.4339 3.55575 13.4876 5.57105C11.9091 4.00095 9.61684 3.1975 7.25758 3.6135Z" fill="#E94057" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>              
        </div>
      </div>
      
      <div class="person2" style="background-image: url(${
        this.dataUsers?.user2?.profile.profile_pic || "assets/imgs/girl2.png"
      })">
        <div class="icon2">
          <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.83534 1.60086C5.98276 0.921543 2.30892 3.49401 1.62961 7.34657C0.399603 14.3223 7.52545 22.1175 11.7044 24.3754C16.4036 23.683 25.7659 18.795 26.9959 11.8193C27.6752 7.96676 25.1027 4.29291 21.2502 3.6136C18.8909 3.1976 16.5986 4.00105 15.0201 5.57115C14.0738 3.55585 12.1946 2.01686 9.83534 1.60086Z" fill="#E94057" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                         
        </div>
      </div>
    </section>

    <section class="its-match-texts d-flex flex-column align-items-center w-100 mb-4 mt-4">
      <h1 class="fw-bold main-color-text title">It’s a match, ${
        this.dataUsers?.user1.profile.firstname ||
        this.dataUsers?.user1.email ||
        ""
      }!</h1>
      <span class="subtitle">Start a conversation now with each other</span>
    </section>

    <button
    id="btnHello"
    class="btn main-color-bg white-color-text fw-bold button-create mt-3r w-100 mb-4"
    type="button"
  >
    Say hello
  </button>

  <button
    id="btnKeepSwiping"
    class="btn main-light-bg main-color-text fw-bold button-create w-100 mb-4"
    type="button"
  >
    Keep swiping
  </button>
   </div>
    `;
  }
}
