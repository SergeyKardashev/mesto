class Card {
  constructor(
    cardData,
    templateSelector,
    onImageClick,
    onDelete,
    onLike,
    userID
  ) {
    this._onImageClick = onImageClick;
    this._onDelete = onDelete;
    this._cardData = cardData;
    this._userID = userID;
    this._onLike = onLike;
    this.isLiked;
    // this._templateSelector = templateSelector;
    this._template = document.querySelector(templateSelector).content;
  }

  handleDelete() {
    if (this._card) {
      this._card.remove();
      this._card = null; // Лучше при удалении карточки очистить ссылку на DOM-элемент:
    }
  }
  // _toggleLike() {
  //   // наверное тут прописать метод запроса к апи?
  //   // если 200, то менять класс, заносить новую цифру из ответа
  //   api.addLike(cardData).then((cardData) => {
  //     this._likesElement.textContent = cardData.likes.length;
  //     this._likeButton.classList.toggle("gallery__like_active");
  //   });
  // }

  _setListeners() {
    this._deleteButton.addEventListener("click", () => this._onDelete(this)); // original delete // this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._likeButton.addEventListener("click", () => this._onLike(this));
    this._cardImage.addEventListener("click", () =>
      this._onImageClick(this._cardData)
    );
  }

  _createCard() {
    /* нельзя перенести this._card и все что в нем ищется в конструктор,т.к. ниже в методе getCard условие на отсутствие карточки. Если объявить ее в конструкторе, то условие ее найдет и не создаст новую.
    Почитать про патерн Singleton или одиночка. */
    this._card = this._template.cloneNode(true).children[0];
    this._cardImage = this._card.querySelector(".gallery__img");
    this._cardText = this._card.querySelector(".gallery__text");
    this._deleteButton = this._card.querySelector(".gallery__delete");
    this._likeButton = this._card.querySelector(".gallery__like");
    this._likesElement = this._card.querySelector(".gallery__like-number");

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardText.textContent = this._cardData.name;
    this._likesElement.textContent = this._cardData.likes.length;
    this._setListeners();
  }

  getCard() {
    if (!this._card) {
      this._createCard();
    }
    // определю залайкана ли карточка МНОЮ
    this.isLiked = this._cardData.likes.some((likes) => {
      return likes._id === this._userID;
    });
    // если я лайкнул ранее, то крашу сердечно
    if (this.isLiked) {
      this._likeButton.classList.add("gallery__like_active");
    }

    if (this._userID !== this._cardData.owner._id) {
      this._deleteButton.remove();
      this._deleteButton = null; // console.log("IDs don't match");
    }
    console.log(
      `%c ${this.isLiked}`,
      "color: blue",
      this._cardData.name,
      this._cardData._id
    );
    return this._card;
  }
}

export default Card;

// this._cardData.likes.forEach((likes) => {
//   if (likes._id === this._userID) {
//     this.isLiked = true;
//     console.log(
//       `%c ${this.isLiked}`,
//       "color: lime",
//       this._cardData.name,
//       this._cardData._id
//     );
//   } else if (likes._id !== this._userID) {
//     this.isLiked = false;
//     console.log(
//       `%c ${this.isLiked}`,
//       "color: red",
//       this._cardData.name,
//       this._cardData._id
//     );
//   }
// });
