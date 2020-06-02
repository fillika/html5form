import is from 'is_js';


/**
 * validateFunctions = {email: fn()}
 */

class ValidationInput {
  constructor(selector, validateFunctions = {}) {
    this.$el = document.querySelector(selector);
    this.$inputs = this.$el.querySelectorAll('[data-input]');
    this.$validateFunctions = validateFunctions;
    this.submit = this.submit.bind(this); // Привязка к контексту
    this.input = this.input.bind(this); // Привязка к контексту
    this.flag = true;
  }

  init() {
    this.$el.addEventListener('submit', this.submit);

    for (let i = 0; i < this.$inputs.length; i++) {
      this.$inputs[i].addEventListener('input', this.input);
    }
  }

  /**
   * По ключу type Я буду получать функцию из объекта validateFunctions
   * @param {event} e
   */
  input(e) {
    const { type } = e.target.dataset;
    const fn = this.$validateFunctions[type];

    // Проверка на случай отсутствия переданного типа и функции
    if (fn) {
      this.flag = fn(e);
    }
  }

  submit(e) {
    e.preventDefault();
  }
}

const params = {
  email(e) {
    const email = e.target;
    const parent = email.parentElement;
    const small = parent.querySelector('small');

    const result = is.email(email.value);


    if (!result) {
      parent.classList.add('invalid');
      small.classList.add('visible');

      // if (errorMessage) {
      //   small.innerHTML = errorMessage;
      // }
    } else {
      parent.classList.remove('invalid');
      small.classList.remove('visible');
    }

    return result;
  },
  password(e) {
    const password = e.target;
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
      //
      // if (errorMessage) {
      //   small.innerHTML = errorMessage;
      // }
    } else {
      parent.classList.remove('invalid');
      small.classList.remove('visible');
    }

    return flag;
  },
  text(e) {
    const text = e.target;
    const parent = text.parentElement;
    const small = parent.querySelector('small');

    let flag = true;
    // логика проверки

    if (text.value.length <= 5) {
      flag = false;
    }

    if (!flag) {
      parent.classList.add('invalid');
      small.classList.add('visible');
    } else {
      parent.classList.remove('invalid');
      small.classList.remove('visible');
    }

    return flag;
  },
};

const form = new ValidationInput('#signInForm', params);
form.init();
