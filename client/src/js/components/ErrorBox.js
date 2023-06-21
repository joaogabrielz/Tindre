class ErrorBox {
  constructor(message = "") {
    this.message = message;
  }

  template() {
    return `
    <div class="alert-box">
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
      <strong>${this.message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
    `;
  }

  templateError() {
    return `
    <div class="alert-box">
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>${this.message ? this.message : "Ops Ocorreu um erro"}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
    `;
  }

  templateWarning() {
    return `
    <div class="alert-box">
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>${this.message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
    `;
  }

  templateSuccess() {
    return `
    <div class="alert-box">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>${this.message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
    `;
  }
}
