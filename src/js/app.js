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
    const input = e.target;
    const { type } = e.target.dataset;
    const parent = input.parentElement;
    const errorField = parent.querySelector('small');
    const fn = this.$validateFunctions[type];

    // Проверка на случай отсутствия переданного типа и функции
    if (fn) {
      this.flag = fn(input, errorField);

      /**
       * Функция сравнения полученного результата проверки
       */
      this.compare(this.flag, parent, errorField);
    }
  }

  // NOTE event тут submit
  submit(e) {
    e.preventDefault();

    if (1) {
      this.$el.querySelector('.form-container__message')
        .classList
        .add('active');
    }

    // eslint-disable-next-line no-param-reassign,no-return-assign
    this.$inputs.forEach(input => input.value = '');
  }

  compare(flag, parent, errorField) {
    if (!flag) {
      parent.classList.add('invalid');
      errorField.classList.add('visible');
    } else {
      parent.classList.remove('invalid');
      errorField.classList.remove('visible');
    }
  }
}

const params = {
  email(input, errorField) {
    const result = is.email(input.value);
    const field = errorField;

    field.innerText = 'Введите корректный email';
    return result;
  },
  password(input, errorField) {
    const field = errorField;
    const regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/gm;
    const check = input.value.match(regExp);
    const flag = true;

    if (!check) {
      field.innerText = 'Пароль должен содержать минимум 8 символов, одна цифра, одна буква в верхнем регистре и одна' +
        ' в нижнем';
      return check;
    }

    return flag;
  },
  text(input) {
    let flag = true;
    // логика проверки

    if (input.value.length <= 5) {
      flag = false;
    }

    return flag;
  },
};

const form = new ValidationInput('#signInForm', params);
form.init();
