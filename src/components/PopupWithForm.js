import { Popup } from "./Popup.js";
/*
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.

Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners.
Метод setEventListeners класса PopupWithForm должен не только добавлять
обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/
export class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmit) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._handleSubmit = this._handleSubmit.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.submitButton = this._form.querySelector(".popup__submit-button");
    //
    // метод setSubmitButtonLabel лишний
    // this.setSubmitButtonLabel = this.setSubmitButtonLabel.bind(this);
    this._submitButtonText = this.submitButton.textContent;
  }

  // собирает данные всех полей формы.
  _getInputValues() {
    this._formInputValues = {};
    this._inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  // isLoading - не переменная, а параметр,
  // используемый только тут

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText;
    } else {
      this.submitButton.textContent = this._submitButtonText;
    }
  }

  // Метод сабмита избавил от инструкций по смене лейбака
  // И от асинхронности т.к. уже не нужно ждать ответа сервака.
  _handleSubmit(evt) {
    evt.preventDefault();
    this._onSubmit(this._getInputValues());
  }
  //
  //
  // Метод Артёма с заменой лейбака. Метод заменил на простой.
  // Т.к. ревьювер предложил свой универсальный
  //
  // async _handleSubmit(evt) {
  //   evt.preventDefault();
  //   const originalText = this.submitButton.textContent;

  //   try {
  //     this.submitButton.textContent = "Сохранение...";
  //     debugger;
  //     await this._onSubmit(this._getInputValues());
  //     this.close();
  //   } finally {
  //     this.submitButton.textContent = originalText;
  //   }
  // }

  //
  // лишний метод, т.к. использовал ревьюверский
  // setSubmitButtonLabel(label) {
  //   this.submitButton.textContent = label;
  // }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
      console.log("setInputValues");
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
