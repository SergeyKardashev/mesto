import {
  initialCards,
  validationConfig,
  popupUser,
  addPlaceButton,
  placeNameInput,
  pleceUrlInput,
  editProfileBtn,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css"; // импорт главного файла стилей. Такая запись только для вебпака

// 🧢  функция открытия попапа ЗУМа - функция зумирования
const handleCardClick = (cardData) => zoomPopup.open(cardData);

// 🧢 🔴 Функция создания карточки. Функция создает, но не возвращает инстанс класса.
// Она возвращает работы метода getCard() каласса Card, то есть разметку карточки полностью готовую к вставке
const createCard = (...args) => new Card(...args).getCard();
// занесли все аргументы передаваемые в функцию в массив ...args. Перечитать и тренировать rest, spread

// 🧢 Функция-колбэк. Обявление, а не вызов
const renderCard = (data) => {
  // создаем переменную, заносим в нее результат работы функции, т.е. разметку
  const cardToAdd = createCard(data, "#card", handleCardClick);

  // вставляю в разметку то, что вернет метод - клонированный и заполненный фрагмент разметки
  cardSection.addItem(cardToAdd);
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery"
);

cardSection.renderItems();

// 🧢 описываю функцию-колбэк сабмита профиля заранее
const handleSubmitProfile = ({ name, job }) => {
  myUserInfo.setUserInfo({ name, job });
  popupProfile.close();
};

// попапу профиля передаю функцию сабмита профиля колбэком при создании инстанса попапа
const popupProfile = new PopupWithForm(
  ".popup_type_user-profile",
  (inputVaues) => {
    handleSubmitProfile(inputVaues);
  }
);

const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// вешаю слушатели попапу профиля
popupProfile.setEventListeners();

// 🧢 👨‍💼 колбэк кнопки редактирования профиля - откроет попап
const editProfile = () => {
  formValidators["profile-form"].resetValidation();
  // Наполняю поля формы данными со страницы через метод класса UserInf

  // деструктуризация. Переменные не покинут пределы слушателя
  const { name, job } = myUserInfo.getUserInfo();

  popupUser.nameInput.value = name;
  popupUser.jobInput.value = job;

  popupProfile.open();
};

// 👨‍💼
editProfileBtn.addEventListener("click", () => editProfile());

// 🧢 колбэк слушателя сабмита карточки
const handleSubmitAddPlace = (formData) => {
  formValidators["add-place-form"].resetValidation();

  const cardDataCollected = {
    name: formData.placeName,
    link: formData.placeUrl,
  };

  const card1by1 = new Card(cardDataCollected, "#card", handleCardClick);
  cardSection.addItem(card1by1.getCard());
  addPlacePopup.close();
};

const addPlacePopup = new PopupWithForm(".popup_type_new-place", (formData) => {
  handleSubmitAddPlace(formData);
});

addPlacePopup.setEventListeners();

addPlaceButton.addEventListener("click", (evt) => {
  formValidators["add-place-form"].resetValidation();
  addPlacePopup.open();
});

const zoomPopup = new PopupWithImage(".popup_type_zoom-image");

zoomPopup.setEventListeners();

const formValidators = {}; // создаю константу с пустысм объектом.

// 🧢 описываю функцию валитатор
const enableValidation = (validationConfig) => {
  // Собираю массив форм (массив кусков разметки, а не имён)
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation(); // вызов метода класса, а не рекурсия
  });
};

enableValidation(validationConfig); // вызов функции
