export class Api {
  constructor(options) {
    this.options = options;
  }

  setInitialUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      headers: this.options.headers,
    });
  }
  // 2. Загрузка карточек с сервера - GET https://mesto.nomoreparties.co/v1/cohortId/cards
  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      headers: this.options.headers,
    });
  }

  // 3. Редактирование профиля - данные идут на сервер.
  // Методом PATCH: PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
  editProfile(newName, newAbout) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ name: newName, about: newAbout }),
    });
  }

  // 4. Добавление новой карточки
  addCard(cardData) {
    //
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    });
  }

  // 5. Отображение количества лайков карточки
  // getLikesNumber() {
  //   return fetch(`а не нужно ли это писать
  //   сразу в методе отрисовки карточки чтобы не брать
  //   инфу отдельным запросом`);
  // }

  delete(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    });
  }
}

/*
7. Удаление карточки
Чтобы удалить карточку, отправьте DELETE-запрос:
DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId



4. Добавление новой карточки
Чтобы добавить на сервер новую карточку, отправьте POST-запрос:
POST https://mesto.nomoreparties.co/v1/cohortId/cards
В заголовках запроса, кроме токена, необходимо отправить Content-Type,
а в теле — JSON с двумя свойствами — name и link.
В name должно быть название создаваемой карточки,
а в link — ссылка на картинку.
Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки:
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },






fetch("https://mesto.nomoreparties.co/v1/cohort-68/users/me", {
  method: "GET",
  headers: {
    authorization: "200161f1-5909-4319-b9ce-fec02ac5663d",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    const userData = {};
    userData.name = result.name;
    userData.about = result.about;
    // Экземпляр класса UserInfo создается единожды
    myUserInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
*/
