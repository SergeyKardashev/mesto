import {
  initialCards,
  config,
  popupUser,
  addPlaceButton,
  addPlaceForm,
  placeNameInput,
  pleceUrlInput,
  editProfileBtn,
} from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css"; // импорт главного файла стилей. Такая запись только для вебпака

//

// 🧢 🔴 Функция создания карточки
// функция создает, но не возвращает инстанс класса.
// Она возвращает работы метода getCard() каласса Card, то есть разметку карточки полностью готовую к вставке
const createCard = (...args) => new Card(...args).getCard();
// занесли все аргументы передаваемые в функцию в массив ...args. Перечитать и тренировать rest, spread

// 🧢 Функция-колбэк. Обявление, а не вызов
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

// 🧢 описываю функцию-колбэк сабмита профиля заранее
const handleSubmitUserProfile = ({ name, job }) => {
  myUserInfo.setUserInfo({ name, job });
};

// попапу профиля передаю функцию сабмита профиля колбэком при создании инстанса попапа
const popupEditProfile = new PopupWithForm(
  ".popup_type_user-profile",
  (inputVaues) => {
    handleSubmitUserProfile(inputVaues);
  }
);

const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// вешаю слушатели попапу профиля
popupEditProfile.setEventListeners();

editProfileBtn.addEventListener("click", function () {
  formValidators["profile-form"].resetValidation();
  // Наполняю поля формы данными со страницы через метод класса UserInf

  // деструктуризация. Переменные не покинут пределы слушателя
  const { name, job } = myUserInfo.getUserInfo();

  popupUser.nameInput.value = name;
  popupUser.jobInput.value = job;

  popupEditProfile.open();
});

// 🧢 колбэк слушателя сабмита карточки
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

const formValidators = {}; // создаю константу с пустысм объектом.

// 🧢 описываю функцию валитатор
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

enableValidation(config); // вызов функции
