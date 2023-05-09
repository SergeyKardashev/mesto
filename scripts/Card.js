class Card {
  constructor(cardData, templateSelector, openPopup, zoomPopup) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._zoomPopup = zoomPopup;
  }

  _onDelete = () => {
    if (this._card) {
      this._card.remove();
    }
  };

  _onLike = () => {
    this._card
      .querySelector(".gallery__like")
      .classList.toggle("gallery__like_active");
  };

  _onZoom = () => {
    const zoomPopup = document.querySelector(".popup_type_zoom-image");
    const popupImage = zoomPopup.querySelector(".popup__image-zoom");
    const popupTxt = zoomPopup.querySelector(".popup__caption");
    popupImage.src = this._cardData.link;
    popupImage.alt = this._cardData.name;
    popupTxt.textContent = this._cardData.name;
    this._openPopup(this._zoomPopup);
  };

  _setListeners = () => {
    this._card
      .querySelector(".gallery__delete")
      .addEventListener("click", this._onDelete);
    this._card
      .querySelector(".gallery__like")
      .addEventListener("click", this._onLike);
    this._card
      .querySelector(".gallery__img")
      .addEventListener("click", this._onZoom);
  };

  _createCard() {
    this._template = document.querySelector(this._templateSelector).content;
    this._card = this._template.cloneNode(true).children[0];
    this._card.querySelector(".gallery__img").src = this._cardData.link;
    this._card.querySelector(".gallery__text").textContent =
      this._cardData.name;
    this._setListeners();
  }

  getCard = () => {
    if (!this._card) {
      this._createCard();
    }
    return this._card;
  };
}

export default Card;
