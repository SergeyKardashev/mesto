/*
Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.

Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
Модальное окно также закрывается при клике на затемнённую область вокруг формы.
*/
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupByOverlay = this._closePopupByOverlay.bind(this);
  }

  _closePopupByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); // Удаляю слушатель клавы.
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // добавление слушателя на Оверлей
    this._popup.addEventListener("click", this._closePopupByOverlay);

    this._closeButton.addEventListener("click", () => this.close());
  }
}
