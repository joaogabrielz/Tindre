class IamView {

  constructor(iam){
    let items = [
     {
      dataset: "Man",
      content:  `
      <div class="d-flex justify-content-between group-gender">
          <button
          id=""
          data-gender="Man"
          class="btn white-color-bg black-color-text button-create w-100 button-gender text-start"
          type="button"
        >
          Man
        </button>
      
          <svg width="15" class="icon-gender-svg" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.16663 6.00004L5.33329 10.1667L13.6666 1.83337" stroke="#ADAFBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>       
        </div>
      `,
      contentSelected: `
      <div class="d-flex justify-content-between group-gender">
          <button
          id=""
          data-gender="Man"
          class="btn main-color-bg white-color-text button-create w-100 text-start fw-bold"
          type="button"
        >
          Man
        </button>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16663 6.00004L5.33329 10.1667L13.6666 1.83337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
        </div>
      `
     },
     {
      dataset: "Woman",
      content:  `
      <div class="d-flex justify-content-between group-gender">
          <button
          id=""
          data-gender="Woman"
          class="btn white-color-bg black-color-text button-create w-100 button-gender text-start"
          type="button"
        >
          Woman
        </button>
      
          <svg width="15" height="12" class="icon-gender-svg" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.16663 6.00004L5.33329 10.1667L13.6666 1.83337" stroke="#ADAFBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>       
        </div>
      `,
      contentSelected: `
      <div class="d-flex justify-content-between group-gender">
          <button
          id=""
          data-gender="Woman"
          class="btn main-color-bg white-color-text button-create w-100 text-start fw-bold"
          type="button"
        >
          Woman
        </button>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16663 6.00004L5.33329 10.1667L13.6666 1.83337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
        </div>
      `
     },
     {
      dataset: "Other",
      content:  `
      <div class="d-flex justify-content-between group-gender-another">
          <button
          id=""
          data-gender="Other"
          class="btn white-color-bg black-color-text button-create w-100 button-gender text-start"
          type="button"
        >
        Choose another
        </button>
        <svg width="7" height="12" class="icon-gender-svg" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.327452 0.410704C0.652889 0.0852667 1.18053 0.0852667 1.50596 0.410704L6.50596 5.4107C6.8314 5.73614 6.8314 6.26378 6.50596 6.58922L1.50596 11.5892C1.18053 11.9147 0.652889 11.9147 0.327452 11.5892C0.00201477 11.2638 0.00201477 10.7361 0.327452 10.4107L4.7382 5.99996L0.327452 1.58922C0.00201477 1.26378 0.00201477 0.736141 0.327452 0.410704Z" fill="#ADAFBB"/>
          </svg>
     
        </div>
      `,
      contentSelected: `
      <div class="d-flex justify-content-between group-gender-another">
      <button
      id=""
      data-gender="Other"
      class="btn main-color-bg white-color-text button-create w-100 text-start fw-bold"
      type="button"
    >
    Choose another
    </button>
                
     <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.327452 0.410704C0.652889 0.0852667 1.18053 0.0852667 1.50596 0.410704L6.50596 5.4107C6.8314 5.73614 6.8314 6.26378 6.50596 6.58922L1.50596 11.5892C1.18053 11.9147 0.652889 11.9147 0.327452 11.5892C0.00201477 11.2638 0.00201477 10.7361 0.327452 10.4107L4.7382 5.99996L0.327452 1.58922C0.00201477 1.26378 0.00201477 0.736141 0.327452 0.410704Z" fill="white"/>
        </svg>
    </div>
      `
     }
    ];
    this.items = items;
    this.iam = iam;
  }


  template() {
    return `
    <section class="d-grid gap-3 col-10 mx-auto">

    <span id="alert"></span>

    <div class="nav-header d-flex align-items-center justify-content-between px-1">
      <button class="btn-back">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.20711 13.7071C7.81658 14.0976 7.18342 14.0976 6.79289 13.7071L0.792893 7.70711C0.402369 7.31658 0.402369 6.68342 0.792893 6.29289L6.79289 0.292893C7.18342 -0.0976315 7.81658 -0.0976315 8.20711 0.292893C8.59763 0.683417 8.59763 1.31658 8.20711 1.70711L2.91421 7L8.20711 12.2929C8.59763 12.6834 8.59763 13.3166 8.20711 13.7071Z" fill="#E94057"/>
          </svg>
      </button>
     
    </div>

    <h1 class="fw-bold black-color-text mt-4">I am a</h1>
    
      <div class="boxGender d-flex flex-column gap-3 mt-4r w-100">
       ${this.items.map((item) => {
        if(this.iam){
          if(this.iam.selectedItem == item.dataset){
            return this.iam.active ? item.contentSelected : item.content
          }
        }
        return item.content;
       }).join('')} 
      </div>
                
 
    <button
    id="btnContinueIam"
    class="btn main-color-bg white-color-text fw-bold button-create mt-3r btn-bot"
    type="button"
  >
    Continue
  </button>
   
</setion>
    `;
  }
}
