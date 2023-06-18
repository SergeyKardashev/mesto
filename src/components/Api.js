export class Api {
  constructor(options) {
    this.options = options;
  }

  setInitialUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка пол-я карт: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка получ профиля: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(cardData) {
    return fetch(`${this.options.baseUrl}/cards/${cardData._id}/likes`, {
      method: "PUT",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка простановки лайка: ${res.status}`);
    });
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  removeLike(cardData) {
    return fetch(`${this.options.baseUrl}/cards/${cardData._id}/likes`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка снятия лайка:  ${res.status}`);
    });
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  editProfile(newName, newAbout) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ name: newName, about: newAbout }),
    });
  }

  addCard(cardData) {
    //
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    });
  }

  delete(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    });
  }

  avatarEdit(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ avatar: avatar }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка авы ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
