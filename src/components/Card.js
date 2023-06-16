class Card {
  constructor(cardData, templateSelector, onImageClick, onDelete) {
    this._onImageClick = onImageClick;
    this._onDelete = onDelete;
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(this._templateSelector).content;
  }
  handleDelete() {
    if (this._card) {
      this._card.remove();
      this._card = null; // Лучше при удалении карточки очистить ссылку на DOM-элемент:
    }
  }
  _toggleLike() {
    this._likeButton.classList.toggle("gallery__like_active");
  }

  _setListeners() {
    // original delete
    // this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._deleteButton.addEventListener("click", () => this._onDelete(this));
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._cardImage.addEventListener("click", () =>
      this._onImageClick(this._cardData)
    );
  }

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
    this._likes = this._card.querySelector(".gallery__like-number");

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardText.textContent = this._cardData.name;
    this._likes.textContent = this._cardData.likes.length;
    this._setListeners();
  }

  getCard() {
    if (!this._card) {
      this._createCard();
    }
    return this._card;
  }
}

export default Card;
