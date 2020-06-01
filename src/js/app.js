class ValidationInput {
  constructor(selector) {
    this.$el = document.querySelector(selector);
    this.submit = this.submit.bind(this); // Привязка к контексту
    this.checkAllValidate = this.checkAllValidate.bind(this); // Привязка к контексту
  }

  init() {
    this.$el.addEventListener('submit', this.submit);
  }

  submit(e) {
    e.preventDefault();

    this.checkAllValidate();
  }

  checkAllValidate() {
    let flag = true;

    if (!this.validatePassword()) {
      flag = false;
    }

    if (!this.validatePassword()) {
      flag = false;
    }

    return flag;
  }

  validatePassword() {
    const password = document.querySelector('[data-input-password]');

    let flag = true;
    // логика проверки

    if (password.length <= 6) {
      flag = false;
    }

    return flag;
  }

  validateEmail() {
    const email = document.querySelector('[data-input-email]');
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email)
      .toLowerCase());
  }
}

const form = new ValidationInput('#signInForm');

form.init();
