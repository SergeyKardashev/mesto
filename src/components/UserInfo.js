/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:

Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя
и элемента информации о себе.

Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

// <h1> Жак-Ив Кусто has class = profile__name
// <p> Исследователь океана  class = profile__about

// form classes = popup__form    and    popup__form_type_user-profile
// form name = profile-form

// input Жак-Ив classes =   popup__input     and      popup__input_type_user-name
// input Жак-Ив id = user-name
// input Жак-Ив = name
export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector); // page element, NOT ITPUT
    this._aboutElement = document.querySelector(aboutSelector); // page element, NOT ITPUT
    this.data = {};
    this._avatarElement = document.querySelector(".profile__avatar");
  }

  // возвращает объект данных профиля
  getUserInfo() {
    return this.data;
    //
    // считывает фио со страницы и отдает объектом
    // return {
    //   name: this._name.textContent,
    //   about: this._about.textContent,
    // };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
    this.data = userData;
    this._nameElement.textContent = this.data.name; // <h1> на странице
    this._aboutElement.textContent = this.data.about; // <p> на странице
    this._avatarElement.src = this.data.avatar; // <img> на странице
  }
  // setUserInfo({ name, about }) {
  //   this._name.textContent = name; // <h1> на странице
  //   this._about.textContent = about; // <p> на странице
  // }
}
