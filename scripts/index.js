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
// 🟡 any form can be found easily
// 🟡 любую форму можно сразу получить из document.forms по уникальному атрибуту name,
// 🟡 который указываются в тегах form
// 🟡 const profileForm = document.forms["profile-form"];
// 🟡 const cardForm = document.forms["card-form"];

const popupUser = (() => {
  const popup = document.querySelector(".popup_type_user-profile");
  return {
    popup,
    // form: popup.querySelector(".popup__form_type_user-profile"),
    form: document.forms["profile-form"],
    nameInput: popup.querySelector(".popup__input_type_user-name"),
    jobInput: popup.querySelector(".popup__input_type_user-job"),
  };
})(); // Последние 2 скобки не лишние - самовызывающаяся функция.

// Весь попап добаления места
const popupAddPlace = document.querySelector(".popup_type_new-place");

// Форма добавления места, а не весь попап, для отправки формы.
// 🟡 любую форму можно сразу получить из document.forms по уникальному атрибуту name
const formElementAddPlace = document.forms["add-place-form"];
// const formElementAddPlace = popupAddPlace.querySelector(".popup__form_type_add-place");

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

// 🧢  функция открытия указанного попапа.
function openPopup(popupName) {
  // 🔴🔴🔴 МОЖЕТ проверить попап на наличие формы в нем??? Если она есть, запустить сброс полей.
  popupName.classList.add("popup_opened"); // добавление класса ОТКРЫТО для попапа
  // Добавил на весь файл слушатель клавы. // Колбэк ИФом по эскейпу закрывает ОТКРЫТый попап.
  document.addEventListener("keydown", closePopupByEscape);
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

// 🧢 Функция сабмита формы UserProfile
function handleFormSubmitUserProfile(evt) {
  evt.preventDefault(); // без перезагрузки страницы
  userNameElement.textContent = popupUser.nameInput.value; // из формы в страницу
  userJobElement.textContent = popupUser.jobInput.value; // из формы в страницу
  closePopup(popupUser.popup); // закладываю функцию сокрытия попапа
}

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

// 🧢 🟢 Функция - отрисовки карточки, (т.е. куска html) передаваемой в аргументе.
function renderCard(cardItem) {
  gallery.prepend(cardItem); // gallery объявлена в глобальном скоупе
}

// 🧢  функция открытия попапа ЗУМа - функция зумирования
function handleCardClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTxt.textContent = cardData.name;
  openPopup(zoomPopup);
}

// 🧢  🟢 Функция создания карточки
function createCard(cardData) {
  const cardItem = new Card(cardData, "#card", handleCardClick);
  renderCard(cardItem.getCard());
}

// 🧢 🟢 Функция сабмита формы нового места. Инфа из полей в объект cardData, его скормлю функции создания карточек.
function handleFormSubmitAddPlace(evt) {
  evt.preventDefault(); // без перезагрузки страницы
  const cardData = {
    name: placeNameInput.value, // Сбор инфы из полей в объект cardData
    link: pleceUrlInput.value, // Сбор инфы из полей в объект cardData
  };
  createCard(cardData);
  formElementAddPlace.reset(); // сброс формы после сабмита
  closePopup(popupAddPlace);
}

// 🟢🟢🟢🟢🟢🟢🟢🟢 Наполняю галлерею карточками из массива объектов initialCards
initialCards.forEach((cardData) => {
  createCard(cardData);
});

// 🟢 Слушатель кнопки открытыя попапа добавления места
addPlaceBtn.addEventListener("click", (evt) => {
  formValidators["add-place-form"].resetValidation();
  // сброс ошибок и тогл был такой: addPleceFormValidator.resetValidation();
  openPopup(popupAddPlace); // открытие попапа
});

// навешиватель слушателей ВСЕМ крестикам взамен ручного навешивания слушателей крестиков трех попапов
closePopupButtonsArray.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// Слушатели оверлеев всех попапов без условия.
// Форычом с функцией добавлю слушатель оверлея.
popupsArray.forEach(setListenerClosePopupByOverlay);

// Слушатель сабмита (кнопки СОХРАНИТЬ) в форме добавления места запускает функцию сабмита
formElementAddPlace.addEventListener("submit", handleFormSubmitAddPlace);

// 🟢 Слушатель кнопки открытыя попапа редактирования профиля
editProfileBtn.addEventListener("click", function () {
  formValidators["profile-form"].resetValidation();
  // сброс ошибок и тогл был такой: profileFormValidator.resetValidation();
  openPopup(popupUser.popup); // открытие попапа
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

// Старый способ запустить валидацию:
// // const addPleceFormValidator = new FormValidator(config, formElementAddPlace);
// // addPleceFormValidator.enableValidation();
// // const profileFormValidator = new FormValidator(config, popupUser.form);
// // profileFormValidator.enableValidation();
//
//
//
//

//  --------- способ универсально создать экземпляры валидаторов всех форм, -------------
// поместив их все в один объект, а потом брать из него валидатор по атрибуту name,
// который задан для формы. Это универсально и для любого кол-ва форм подходит.

const formValidators = {}; // создаю константу с пустысм объектом.

// -- Включение валидации --

// Создаю функцию enableValidation - НЕ ВЫЗЫВАЮ!!!
const enableValidation = (config) => {
  // Собираю массив форм (массив кусков разметки, а не имён)
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    // Каждой форме создаю объект-экземпляр класса FormValidator
    const validator = new FormValidator(config, formElement);

    // Пишу имя формы в переменную formName (получаем данные из атрибута `name` у формы)
    const formName = formElement.getAttribute("name");

    // Вношу свойства в объект. (вот тут в объект записываем под именем формы)
    // Ключ свойства = имя формы. Значение свойства = разметка формы.
    formValidators[formName] = validator;
    validator.enableValidation(); // вызов метода класса, а не рекурсия
  });
};

enableValidation(config); // вызов НОВОЙ функции
// еще вызываю метод resetValidation дважды для двух форм в двух местах кода.
