import { initialCards } from "./content.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// СОДЕРЖИМОЕ ШАБЛОНА КАРТОЧКИ - #document-fragment без метода .remove()
const cardTemplateContent = document.getElementById("card").content;

// если querySelector без .content, получал именно html элемент
// а когда делал c .content, то получал документ-фрагмент,
// у #document-fragment нет метода remove

// правильное решение:
// const cardTemplateContent = document
//  .querySelector("#card")
// 	.content
//  .querySelector('.gallery__element');

// ДИВ-ОБЕРТКА КАРТОЧКИ ПО ИМЕНИ КЛАССА (html-узел)
const galleryElement = cardTemplateContent.querySelector(".gallery__element");

// Галерея КУДА КЛАСТЬ НОВЫЕ КАРТОЧКИ - (html-узел), принимающий новорожденные карточки.
const gallery = document.querySelector(".gallery");

// Все попапы коллекцией и массивом
const popups = document.querySelectorAll(".popup");
const popupsArray = Array.from(popups);

// ФИО в тексте профиля (html-узел)
const userNameElement = document.querySelector(".profile__name");

// должность в тексте профиля (html-узел)
const userJobElement = document.querySelector(".profile__job");

// кнопка редактирования профиля (html-узел)
const editProfileBtn = document.querySelector(".profile__edit-btn");

// кнопка добавления места в профиле рядом с аватаркой
const addPlaceBtn = document.querySelector(".profile__add-place-btn");

// функция, возвращающая объект popupUser с частями попапа профиля.
const popupUser = (() => {
  const popup = document.querySelector(".popup_type_user-profile");
  return {
    popup,
    form: popup.querySelector(".popup__form_type_user-profile"),
    nameInput: popup.querySelector(".popup__input_type_user-name"),
    jobInput: popup.querySelector(".popup__input_type_user-job"),
  };
})(); // Последние 2 скобки не лишние - самовызывающаяся функция.

// Весь попап добаления места
const popupAddPlace = document.querySelector(".popup_type_new-place");

// Форма добавления места, а не весь попап, для отправки формы.
const formElementAddPlace = popupAddPlace.querySelector(
  ".popup__form_type_add-place"
);

// Поле ввода названия места
const placeNameInput = formElementAddPlace.querySelector(
  ".popup__input_type_place-name"
);

// Поле ввода URL места
const pleceUrlInput = formElementAddPlace.querySelector(
  ".popup__input_type_place-url"
);

// Кнопка сабмита попапа места или добавления места в попапе добавления места.
const submitPlaceButton = popupAddPlace.querySelector(".popup__submit-button");

// Весь папап ЗУМа
const zoomPopup = document.querySelector(".popup_type_zoom-image");

// Картинка попапа zoom (html-узел)
const popupImage = zoomPopup.querySelector(".popup__image-zoom");

// Подпись попапа zoom (html-узел)
const popupTxt = zoomPopup.querySelector(".popup__caption");

// Все кнопки закрытия попапов массивом из коллекции
const closePopupButtonsCollection = document.querySelectorAll(
  ".popup__close-button"
);
const closePopupButtonsArray = Array.from(closePopupButtonsCollection);

// 🧢 функция Установить валиный статус ВСЕМ полям ОТКРЫТОГО попапа. Вызывать при зарытии попапа.
// Бывало закрывал попап при невалидных полях, а при следующем его открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
function setFormInputsValidStatus(formToSetValid) {
  // БУДУ ЧИСТИТЬ ФОРМУ чтобы она не хранила ошибок от прошлого откытия и закрытия.
  // Собираю все инпуты попапа в коллекцию > массив
  const inputsCollection = formToSetValid.querySelectorAll(".popup__input");
  const inputsArr = Array.from(inputsCollection);

  // Прохожу по массиву инпутов, меняя статус каждому полю.
  inputsArr.forEach((inputToSetValid) => {
    inputToSetValid.classList.remove("popup__input_type_error"); // убрать класс красной рамки ИНПУТА
    const errorItemToSetValid = document.querySelector(
      `.${inputToSetValid.id}-input-error`
    );
    errorItemToSetValid.textContent = ""; // удалить содержимое ОШИБКИ
    errorItemToSetValid.classList.remove("popup__error_visible"); // выключить отображение ОШИБКИ
  });
}

// 🧢  функция открытия указанного попапа.
function openPopup(popupName) {
  popupName.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа

  // Добавил на весь файл слушатель клавы.  // Колбэк ИФом по эскейпу закрывает ОТКРЫТый попап.
  document.addEventListener("keydown", closePopupByEscape);
}

// 🧢  функция открытия указанного попапа С ФОРМОЙ. Вызываю ее только для попапов с формами.
// Просто разным кнопкам разные функции вызываю. Зум-попап открываю без сброса полей простой функцией.
// А попапы с полями открываю этой крученой функцией.
function openPopupWithForm(popupName) {
  // Ставлю валиность ВСЕМ полям открываемого попапа.
  // Бывало закрывал попап при невалидных полях, а при следующем его открытии поля ОСТАВАЛИСЬ НЕВАЛИДНЫМИ)
  const formToReset = popupName.querySelector(".popup__form");
  formToReset.reset();
  setFormInputsValidStatus(formToReset);
  openPopup(popupName); //  вызываю открытие формы
}

// 🧢 функция закрытия указанного попапа.
function closePopup(popupToClose) {
  popupToClose.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape); // Удаляю слушатель клавы.
}

//
// 🧢 функция закрытия попапа по эскейпу
// НЕ даю попап в виде Аргумента функции. Нахожу его внутри.
// Добавил аргумент Ивент в скобки. Конструкция ИФ должна брать ивент из родителя - слушателя.
function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector(".popup_opened");
    // раньше условие было таким: evt.key === "Escape" && popupToClose
    // но нет смысла во второй части условия, т.к. эта функция вызывается только к открытым попапам,
    // так как слушатель эскейпа навешивается при открытии попапа.
    // Тут запись "&& popupToClose" значит: И  "попап, который надо закрыть" равен правде,
    // т.е. существуюет и не нулевой не пустой. (открытый попап - попап, которому уже назначен класс открытия)
    closePopup(popupToClose);
  }
}

// 🧢 функция удаления указанного элемента
function deleteCardElement(cardToDelete) {
  cardToDelete.remove();
}

// 🧢 функция лайка для объекта (кнопки), передаваемого в нее
function likeCardElement(btnToLike) {
  btnToLike.classList.toggle("gallery__like_active");
}

// 🧢 Функция сабмита формы UserProfile
function handleFormSubmitUserProfile(evt) {
  evt.preventDefault(); // без перезагрузки страницы
  userNameElement.textContent = popupUser.nameInput.value; // из формы в страницу
  userJobElement.textContent = popupUser.jobInput.value; // из формы в страницу
  closePopup(popupUser.popup); // закладываю функцию сокрытия попапа
}
// // 🧢 Функция добавления карточек в конец раньше была тут
// // 🧢 Функция добавления карточек в начало раньше была тут

// 🧢 Функция закрытия попапа по клику на оверлее - колбэк для функции closePopupByOverlay.
// Сюда нельзя передать из вызывающей функции аргумент кроме ивента,
// так что какой попап закрывать указал не передаваемой переменной, а объектом, на котором висит слушатель.
function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

// 🧢 Функция добавления слушателя на Овелей для закрытия попапа по клику на оверлее.
function setListenerClosePopupByOverlay(popupName) {
  popupName.addEventListener("click", closePopupByOverlay);
}

// 🧢  Функция создания карточки
function createCard(cardData) {
  const createdCard = new Card(cardData, "#card", openPopup, zoomPopup);
  return createdCard;
}

// 🧢 Функция сабмита формы нового места. Инфа из полей в объект cardData, его скормлю функции создания карточек.
function handleFormSubmitAddPlace(evt) {
  evt.preventDefault(); // без перезагрузки страницы

  const cardData = {
    name: placeNameInput.value, // Сбор инфы из полей в объект cardData
    link: pleceUrlInput.value, // Сбор инфы из полей в объект cardData
  };

  const cardElement = createCard(cardData);
  renderCardBefore(cardElement.getCard());
  closePopup(popupAddPlace);
}

// 🧢 Функция - Наполняю галлерею карточками из массива данных initialCards
function renderCardBefore(cardItem) {
  gallery.prepend(cardItem); // gallery объявлена в глобальном скоупе
}
function renderCardAfter(cardItem) {
  gallery.append(cardItem); // gallery объявлена в глобальном скоупе
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card", openPopup, zoomPopup);
  renderCardAfter(card.getCard());
});

// Слушатель кнопки открытые попапа добавления места
addPlaceBtn.addEventListener("click", (evt) => {
  // отлючил опустошение полей, т.к. в функции openPopupWithForm прописан ресет формы при отправке.
  // placeNameInput.value = "";
  // pleceUrlInput.value = "";

  // Отключаю кнопку хардкодом при открытии попапа в 2 действия. Функцией не работает.
  submitPlaceButton.classList.add("popup__submit-button_inactive"); // 1) стиль неактивной кнопки
  submitPlaceButton.setAttribute("disable", ""); // 2) свойство отключения в разметке.

  openPopupWithForm(popupAddPlace); // открытие попапа
});

// Один навешиватель слушателей всем крестикам взамен ручного навешивания слушателей крестиков трех попапов
closePopupButtonsArray.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// Слушатели оверлеев всех попапов без условия. Форычом с функцией добавлю слушатель оверлея.
popupsArray.forEach((popupItem) => {
  setListenerClosePopupByOverlay(popupItem);
});

// Слушатель сабмита (кнопки СОХРАНИТЬ) в форме добавления места запускает функцию сабмита
formElementAddPlace.addEventListener("submit", handleFormSubmitAddPlace);

// Слушатель кнопки редактирования профиля
editProfileBtn.addEventListener("click", function () {
  openPopupWithForm(popupUser.popup); // открытие попапа
  popupUser.nameInput.value = userNameElement.textContent; // из страницы в форму
  popupUser.jobInput.value = userJobElement.textContent; // из страницы в форму
});

// слушатель сабмита формы профиля = СОХРАНИТЬ в форме профиля
popupUser.form.addEventListener("submit", handleFormSubmitUserProfile);

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// запускаю валидацию

const addPleceFormValidator = new FormValidator(config, formElementAddPlace);
addPleceFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, popupUser.form);
profileFormValidator.enableValidation();
