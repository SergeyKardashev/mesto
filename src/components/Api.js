export class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    // тут проверка ответа
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setInitialUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  addLike(card) {
    return fetch(`${this.options.baseUrl}/cards/${card.cardData._id}/likes`, {
      method: "PUT",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  removeLike(card) {
    return fetch(`${this.options.baseUrl}/cards/${card.cardData._id}/likes`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  editProfile(newName, newAbout) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ name: newName, about: newAbout }),
    }).then(this._checkResponse);
  }

  addCard(cardData) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    }).then(this._checkResponse);
  }

  delete(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  avatarEdit(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(avatar),
    }).then(this._checkResponse);
  }
}
