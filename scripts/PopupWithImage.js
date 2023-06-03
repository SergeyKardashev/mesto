import { Popup } from "./Popup.js";
/*
Создайте класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
}
// Картинка попапа zoom (html-узел)
// const popupImage = zoomPopup.querySelector(".popup__image-zoom");

// Подпись попапа zoom (html-узел)
// const popupTxt = zoomPopup.querySelector(".popup__caption");
