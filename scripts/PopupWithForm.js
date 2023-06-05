import { Popup } from "./Popup.js";
import { UserInfo } from "./UserInfo.js";

/*
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные
всех полей формы.
Перезаписывает родительский метод setEventListeners.
Метод setEventListeners класса PopupWithForm должен не только добавлять
обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как
при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

export class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmit) {
    super(popupSelector);
    this.onSubmit = onSubmit;
    this.onSubmit = this.onSubmit.bind(this);
    this.form = this.popup.querySelector(".popup__form");
    this.submitButton = this.popup.querySelector(".popup__submit-button");
    this._inputList = Array.from(this.form.querySelectorAll(".popup__input"));
    console.log(this._inputList);
  }

  _getInputValues() {
    this._formInputValues = {};

    this._inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    console.log(this._formInputValues);

    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.onSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}
