import { initialCards } from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// СОДЕРЖИМОЕ ШАБЛОНА КАРТОЧКИ - #document-fragment без метода .remove()
const cardTemplateContent = document.getElementById("card").content;

// ДИВ-ОБЕРТКА КАРТОЧКИ ПО ИМЕНИ КЛАССА (html-узел)
const galleryElement = cardTemplateContent.querySelector(".gallery__element");

// Галерея КУДА КЛАСТЬ НОВЫЕ КАРТОЧКИ - (html-узел), принимающий новорожденные карточки.
const gallery = document.querySelector(".gallery");

// Все попапы коллекцией и массивом
const popups = document.querySelectorAll(".popup");
const popupsArray = Array.from(popups);

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

// Весь папап ЗУМа
const zoomPopup = document.querySelector(".popup_type_zoom-image");

// Подпись попапа zoom (html-узел)
const popupTxt = zoomPopup.querySelector(".popup__caption");

// Все кнопки закрытия попапов массивом из коллекции
const closePopupButtonsCollection = document.querySelectorAll(
  ".popup__close-button"
);

const addPlaceButton = document.querySelector(".profile__add-place-btn");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const pleceUrlInput = document.querySelector(".popup__input_type_place-url");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceForm = document.querySelector(".popup__form_type_add-place");

// 🧢  🔴 Функция создания карточки
// функция создает, но не возвращает инстанс класса.
// Она возвращает работы метода getCard(); каласса Card, то есть разметку.

// занесли все аргументы передаваемые в функцию в массив ...args
// rest, spread подтянуть
const createCard = (...args) => new Card(...args).getCard();

const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// объявдегие колбэка, а не вызов
const renderCards = (data) => {
  // создаем переменную, заносим в нее результат работы функции, т.е. разметку
  const myCard = createCard(data, "#card", handleCardClick);

  // вставляю в разметку то, что вернет метод - клонированный и заполненный фрагмент разметки
  mySection.addItem(myCard);
};

const mySection = new Section(
  {
    items: initialCards,
    renderer: renderCards,
  },
  ".gallery"
);

mySection.renderItems();

// описываю функцию сабмита профиля заранее
const handleSubmitUserProfile = ({ name, job }) => {
  myUserInfo.setUserInfo({ name, job });
};

// передаю функцию забмита профиля колбэком при создании объекта попапа
const popupEditProfileForm = new PopupWithForm(
  ".popup_type_user-profile",
  (inputVaues) => {
    handleSubmitUserProfile(inputVaues);
  }
);

popupEditProfileForm.setEventListeners();

editProfileBtn.addEventListener("click", function () {
  formValidators["profile-form"].resetValidation();
  // Наполняю поля формы данными со страницы через метод класса UserInf

  // деструктуризация. Переменные не покинут пределы слушателя
  const { name, job } = myUserInfo.getUserInfo();

  popupUser.nameInput.value = name;
  popupUser.jobInput.value = job;

  popupEditProfileForm.open();
});

// колбэк слушателя сабмита карточки
const handleSubmitAddPlace = () => {
  const cardDataCollected = {
    name: placeNameInput.value,
    link: pleceUrlInput.value,
  };

  const card1by1 = new Card(cardDataCollected, "#card", handleCardClick);
  mySection.addItem(card1by1.getCard());
};

addPlaceButton.addEventListener("click", (evt) => {
  const addPlacePopup = new PopupWithForm(".popup_type_new-place", () => {
    handleSubmitAddPlace(evt);
  });
  formValidators["add-place-form"].resetValidation();
  addPlacePopup.setEventListeners();
  addPlacePopup.open();
});

addPlaceForm.addEventListener("submit", (evt) => {
  formValidators["add-place-form"].resetValidation();

  evt.preventDefault();
});

const cardPopup = new PopupWithImage(".popup_type_zoom-image");

// 🧢  функция открытия попапа ЗУМа - функция зумирования
function handleCardClick(cardData) {
  cardPopup.open(cardData);
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidators = {}; // создаю константу с пустысм объектом.

const enableValidation = (config) => {
  // Собираю массив форм (массив кусков разметки, а не имён)
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation(); // вызов метода класса, а не рекурсия
  });
};

enableValidation(config); // вызов НОВОЙ функции
