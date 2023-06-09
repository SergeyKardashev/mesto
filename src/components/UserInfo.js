/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:

Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя
и элемента информации о себе.

Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

// class names ani IDs
//
// <h1> Жак-Ив Кусто has class = profile__name
// <p> Исследователь океана  class = profile__job

// form classes = popup__form    and    popup__form_type_user-profile
// form name = profile-form

// input Жак-Ив classes =   popup__input     and      popup__input_type_user-name
// input Жак-Ив id = user-name
// input Жак-Ив = name
export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector); // page element, NOT ITPUT
    this._job = document.querySelector(jobSelector); // page element, NOT ITPUT
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }
  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, job }) {
    this._name.textContent = name; // <h1> на странице
    this._job.textContent = job; // <p> на странице
  }
}
