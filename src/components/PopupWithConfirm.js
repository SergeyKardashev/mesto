import { PopupWithForm } from "./PopupWithForm";

export class PopupWithConfirm extends PopupWithForm {
  // без конструктора. унаследованный сабмит будет перезаписан
  open(onSubmit) {
    super.open();
    this._onSubmit = onSubmit;
  }
}
