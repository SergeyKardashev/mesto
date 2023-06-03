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
    // console.log(this.popup);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    // this.setEventListeners();
    // console.log(this.closeButton);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.closePopupByOverlay = this.closePopupByOverlay.bind(this);
    // console.log(this.close);
  }

  closePopupByOverlay(evt) {
    // console.log(this);
    if (evt.currentTarget === evt.target) {
      // console.log(this.close);
      this.close();
    }
  }

  open() {
    // console.log(this);
    this.popup.classList.add("popup_opened");
    // документу слушатель эскейпа.
    // Проверить чтобы не дубль.
    // МБ нужно передавать evt при вызове.
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
      // const popupToClose = document.querySelector(".popup_opened");
      // this.close(popupToClose);
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      console.log("hobaaaa");
      this.close();
    });
  }
}
// function setListenerClosePopupByOverlay(popupName) {
//   popupName.addEventListener("click", closePopupByOverlay);
// }
