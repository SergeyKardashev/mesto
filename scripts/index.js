// кнопка редактирования профиля и проверка переменной через консоль
const btnProfile = document.querySelector(".profile__edit-btn");
// console.log(`Profile button element: ${btnProfile}`);

// весь попап профиля
const popupProfile = document.querySelector(".popup");
// console.log(popupProfile);

// ищу html элемент с ФИО в тексте профиля (объект или узел дом-дерева)
let userNameElement = document.querySelector(".profile__name");
// проверяю его ли я нашел console.log(userNameTag);

// ищу html-элемент с должностью в тексте профиля (объект или узел дом-дерева)
let userJobElement = document.querySelector(".profile__job");
// console.log(userJobElement); // проверяю его ли я нашел

// Находим форму в DOM +  проверяю ее ли я нашел. Нужна отдельно форма, а не весь попап, так как буду обращаться к нему для отправки формы.
let formElement = popupProfile.querySelector(".popup__form");
// console.log(`Form: ${formElement}`);

// ищу поле ввода ФИО + проверяю его ли я нашел
let userNameInput = formElement.querySelector(".popup__input_type_user-name");
// console.log(`FIO input: ${userNameInput}`);

// ищу поле ввода работы + проверяю его ли я нашел
let userJobInput = formElement.querySelector(".popup__input_type_user-job");
// console.log(`Job Input: ${userJobInput}`);

// крестик - кнопка закрытия попапа профиля
const btnPopupProfileClose = popupProfile.querySelector(".popup__close-button");

// клик по кнопке редактирования профиля + проверка на отлов клика
btnProfile.addEventListener("click", function () {
  // console.log("clicked btnProfile");

  // Заполняю поля формы значениями из объектов страницы
  userNameInput.value = userNameElement.textContent;
  userJobInput.value = userJobElement.textContent;

  popupProfile.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа
});

// объявляю функцию, которая убирает класс, делающий попап видимым
function closePopup() {
  popupProfile.classList.remove("popup_opened"); // убираю класс, делающий попап видимым
}

// клик по крестику - кнопке закрытия попапа профиля
btnPopupProfileClose.addEventListener("click", function () {
  // проверка на отлов клика console.log("clicked closed");
  // вызываю функцию сокрытия попапа
  closePopup();
});

// Обработчик «отправки» формы (без вызова, просто функция)
function handleFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = userNameInput.value;
  userJobElement.textContent = userJobInput.value;
  // закладываю функцию сокрытия попапа
  closePopup();
}

// Клик по кнопке СОХРАНИТЬ
// 1) Добавляю обработчик к ФОРМЕ (не к кнопке):
// 2) Он следит за событием “submit”, а НЕ "клик"
// 3) Он запустит функцию с букетом инструкций, а не одно действие.
formElement.addEventListener("submit", handleFormSubmit);
