// кнопка редактирования профиля
const profileEditBtn = document.querySelector(".profile__edit-btn");
// проверка переменной через консоль
// console.log(profileEditBtn);

// весь попап профиля
const popupProfileEdit = document.querySelector(".popup_profile-edit");

// крестик - кнопка закрытия попапа профиля
const popupCloseBtn = document.querySelector(".popup__close-button");

profileEditBtn.addEventListener("click", function () {
  // проверка на отлов клика
  // console.log("clicked");
  // добавление класса ОТКРЫТО для попапа
  popupProfileEdit.classList.add("popup_open");
});

// клик по крестику - кнопка закрытия попапа профиля
// убираю класс, делающий попап видимым
popupCloseBtn.addEventListener("click", function () {
  popupProfileEdit.classList.remove("popup_open");
});

// ищу поле ввода фамилии
let inputUserName = popupProfileEdit.querySelector(".popup__input_user-name");
// проверяю его ли я нашел
// console.log(inputUserName);

// ищу html-тег с фамилией в тексте профиля
let userNameTag = document.querySelector(".profile__name");
// проверяю его ли я нашел
// console.log(userNameTag);

// Ищу значение ФИО внутри тега. Его можно брать НЕ из переменной.
// let userNameValue = userNameTag.textContent;
// Проверяю его ли я нашел
// console.log(userNameValue);

// Записываю в поля ввода значения из страницы
// записываю значение из тега с именем сразу в поле ввода без лишней переменной userNameValue

// Ищу значение поля ввода и проверяю его ли я нашел
// console.log(inputUserName.value);

// Записываю внутрь значения поля новое текстовое содержимое переменной, хранящей thml-тег с ФИО
inputUserName.value = userNameTag.textContent;
