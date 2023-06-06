import { Popup } from "./Popup.js";
/*
Создайте класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.zoomedImg = this.popup.querySelector(".popup__image-zoom");
    this.caption = this.popup.querySelector(".popup__caption");
  }

  open({ name, link }) {
    super.open();
    this.zoomedImg.src = link;
    this.zoomedImg.alt = name;
    this.caption.textContent = name;
  }
}
