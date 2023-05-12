class Card {
  constructor(cardData, templateSelector, onClick) {
    this._onClick = onClick;
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
  }
  _handleDelete = () => {
    if (this._card) {
      this._card.remove();
    }
  };
  _toggleLike = () => {
    this._likeButton.classList.toggle("gallery__like_active");
  };

  _setListeners = () => {
    this._deleteButton.addEventListener("click", this._handleDelete);
    this._likeButton.addEventListener("click", this._toggleLike);
    this._cardImage.addEventListener("click", () => {
      this._onClick(this._cardData);
    });
  };

  _createCard() {
    // нельзя перенести this._card и все что в нем ищется в конструктор,
    // т.к. ниже в методе getCard условие на отсутствие карточки.
    // Если объявить ее в конструкторе, то условие ее найдет и не создаст новую.
    // Почитать про патерн Singleton или одиночка.
    this._card = this._template.cloneNode(true).children[0];
    this._cardImage = this._card.querySelector(".gallery__img");
    this._cardText = this._card.querySelector(".gallery__text");
    this._deleteButton = this._card.querySelector(".gallery__delete");
    this._likeButton = this._card.querySelector(".gallery__like");

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardText.textContent = this._cardData.name;
    this._setListeners();
  }

  getCard = () => {
    // console.log(this._onClick);
    // console.log(this._cardData);
    if (!this._card) {
      this._createCard();
    }
    return this._card;
  };
}

export default Card;
