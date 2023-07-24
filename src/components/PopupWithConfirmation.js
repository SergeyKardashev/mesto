import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithConfirm extends PopupWithForm {
  // без конструктора. унаследованный сабмит будет перезаписан
  open(onSubmit) {
    super.open();
    this._onSubmit = onSubmit;
  }
}
