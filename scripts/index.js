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
let formElement = popupProfile.querySelector(".popup__form_type_profile");
// console.log(`Form: ${formElement}`);

// ищу поле ввода ФИО + проверяю его ли я нашел
let userNameInput = formElement.querySelector(".popup__input_user-name");
// console.log(`FIO input: ${userNameInput}`);

// ищу поле ввода работы + проверяю его ли я нашел
let userJobInput = formElement.querySelector(".popup__input_user-job");
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

// клик по крестику - кнопке закрытия попапа профиля
btnPopupProfileClose.addEventListener("click", function () {
  // проверка на отлов клика console.log("clicked closed");

  popupProfile.classList.remove("popup_opened"); // убираю класс, делающий попап видимым
});

// Обработчик «отправки» формы (без вызова, просто функция)
function handleFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = userNameInput.value;
  userJobElement.textContent = userJobInput.value;
  popupProfile.classList.remove("popup_opened");
}

// Клик по кнопке СОХРАНИТЬ
// 1) добавляю обработчик к ФОРМЕ (не к кнопке):
// 1) он будет следить за событием “submit”, а НЕ "клик"
popupProfile.addEventListener("submit", handleFormSubmit);
