import is from 'is_js';

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

    const flag = this.checkAllValidate();

    if (flag) {
      this.$el.submit();
    }
  }

  checkAllValidate() {
    let flag = true;

    if (!this.validateEmail('Введите корректный email')) {
      flag = false;
    }

    if (!this.validatePassword('Пароль должен быть более 6 символов')) {
      flag = false;
    }

    if (flag) {
      // eslint-disable-next-line no-console
      console.log('VALID');
      // Показываем всплывашку, очищаем форму
    } else {
      // eslint-disable-next-line no-console
      console.log('INVALID');
    }

    return flag;
  }

  validatePassword(errorMessage) {
    const password = document.querySelector('[data-input="password"]');
    const parent = password.parentElement;
    const small = parent.querySelector('small');

    let flag = true;
    // логика проверки

    if (password.value.length <= 6) {
      flag = false;
    }

    if (!flag) {
      parent.classList.add('invalid');
      small.classList.add('visible');

      if (errorMessage) {
        small.innerHTML = errorMessage;
      }
    } else {
      parent.classList.remove('invalid');
      small.classList.remove('visible');
    }

    return flag;
  }

  validateEmail(errorMessage) {
    const email = document.querySelector('[data-input="email"]');
    const parent = email.parentElement;
    const small = parent.querySelector('small');

    const result = is.email(email.value);


    if (!result) {
      parent.classList.add('invalid');
      small.classList.add('visible');

      if (errorMessage) {
        small.innerHTML = errorMessage;
      }
    } else {
      parent.classList.remove('invalid');
      small.classList.remove('visible');
    }

    return result;
  }
}

const form = new ValidationInput('#signInForm');

form.init();
