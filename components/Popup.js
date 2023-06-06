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
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.closePopupByOverlay = this.closePopupByOverlay.bind(this);
  }

  closePopupByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);

    // добавление слушателя на Оверлей
    this.popup.addEventListener("click", this.closePopupByOverlay);
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); // Удаляю слушатель клавы.
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
