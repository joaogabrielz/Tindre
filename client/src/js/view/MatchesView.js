class MatchesView {
  constructor(users) {
    this.users = users;
  }

  getAge(birthday) {
    const birthYear = new Date(birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  }

  template() {
    return `
    
    <section class="d-grid gap-3 col-10 mx-auto">

    <span id="alert"></span>
    
    <div class="mt-4 d-flex justify-content-between">
      <h1 class="fw-bold black-color-text">Matches</h1>
      <button class="btn-sort" disabled>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 3V21" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.5 8.94971L9.5 2.94971" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503V3.05029" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503L20.5 15.0503" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>              
      </button>
    </div>
    <p>This is a list of people who have liked you and your matches.</p>
    
    <div class="boxMatches w-100 pb-4r mt-2">

        <div class="row row-cols-2 justify-content-center gap-3">

        ${
          this.users &&
          this.users.length &&
          this.users
            .map(
              (user) => `
        <div class="box-img-match">
        <img src="${
          user.profile?.profile_pic || "assets/imgs/avatar.png"
        }" alt="">
        <span class="h5 overlay-name fw-bold white-color-text">${
          user.profile?.firstname ? user.profile.firstname : user.email
        } ${user.profile?.birthday ? ", " : ""} ${
                user.profile?.birthday ? this.getAge(user.profile.birthday) : ""
              }</span>
        <div class="overlay-box-img">
          <div class="bg"></div>
         <div class="box-x"> 
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.24408 1.24408C1.56951 0.918641 2.09715 0.918641 2.42259 1.24408L6 4.82149L9.57741 1.24408C9.90285 0.918641 10.4305 0.918641 10.7559 1.24408C11.0814 1.56951 11.0814 2.09715 10.7559 2.42259L7.17851 6L10.7559 9.57741C11.0814 9.90285 11.0814 10.4305 10.7559 10.7559C10.4305 11.0814 9.90285 11.0814 9.57741 10.7559L6 7.17851L2.42259 10.7559C2.09715 11.0814 1.56951 11.0814 1.24408 10.7559C0.918641 10.4305 0.918641 9.90285 1.24408 9.57741L4.82149 6L1.24408 2.42259C0.918641 2.09715 0.918641 1.56951 1.24408 1.24408Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>   
        </div>         
        <div class="divisor"></div>          
          <div class="box-hearth">
            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.24996 1.33325C3.71866 1.33325 1.66663 3.38529 1.66663 5.91658C1.66663 10.4999 7.08329 14.6666 9.99996 15.6358C12.9166 14.6666 18.3333 10.4999 18.3333 5.91658C18.3333 3.38529 16.2813 1.33325 13.75 1.33325C12.1998 1.33325 10.8294 2.10279 9.99996 3.28067C9.1705 2.10279 7.80008 1.33325 6.24996 1.33325Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> 
          </div>               
        </div>
      </div>
        `
            )
            .join("")
        }
           
        </div>
    
    </div>
              

  ${new navOptions().template()}
    `;
  }

  templateNoContent() {
    return `
    
    <section class="d-grid gap-3 col-10 mx-auto">

    <span id="alert"></span>
    
    <div class="mt-4 d-flex justify-content-between">
      <h1 class="fw-bold black-color-text">Matches</h1>
      <button class="btn-sort" disabled>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 3V21" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.5 8.94971L9.5 2.94971" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503V3.05029" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503L20.5 15.0503" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>              
      </button>
    </div>
    <p>This is a list of people who have liked you and your matches.</p>
    
    <div class="boxMatches w-100 pb-4r mt-2">

      
    </div>
              
  ${new navOptions().template()}
    `;
  }

  templateNoMatches() {
    return `
    
    <section class="d-grid gap-3 col-10 mx-auto">

    <span id="alert"></span>
    
    <div class="mt-4 d-flex justify-content-between">
      <h1 class="fw-bold black-color-text">Matches</h1>
      <button class="btn-sort" disabled>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 3V21" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.5 8.94971L9.5 2.94971" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503V3.05029" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 21.0503L20.5 15.0503" stroke="#E94057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>              
      </button>
    </div>
    <p>This is a list of people who have liked you and your matches.</p>
    
    <div class="boxMatches w-100 pb-4r mt-2">

    <h4 class="text-center">Você não tem matches no momento...</h4>
      
    </div>
              
  ${new navOptions().template()}
    `;
  }
}
