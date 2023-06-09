import { Popup } from "./Popup.js";
/*
Создайте класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomedImg = this._popup.querySelector(".popup__image-zoom");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    super.open();
    this._zoomedImg.src = link;
    this._zoomedImg.alt = name;
    this._caption.textContent = name;
  }
}
