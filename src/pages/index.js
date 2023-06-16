import {
  // initialCards,
  validationConfig,
  popupUser,
  addPlaceButton,
  editProfileBtn,
  likeNumber,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "./index.css"; // импорт главного файла стилей. Такая запись только для вебпака

// 🧢  функция открытия попапа ЗУМа - функция зумирования
const handleCardClick = (cardData) => zoomPopup.open(cardData);

// 🧢 🔴 Функция создания карточки. Функция создает, но не возвращает инстанс класса.
// Она возвращает работы метода getCard() каласса Card, то есть разметку карточки полностью готовую к вставке
const createCard = (...args) => new Card(...args).getCard();
// занесли все аргументы передаваемые в функцию в массив ...args. Перечитать и тренировать rest, spread

// Инстанс Api должен быть единственным!
//  200161f1-5909-4319-b9ce-fec02ac5663d
//  cohort-68
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "200161f1-5909-4319-b9ce-fec02ac5663d",
    "Content-Type": "application/json",
  },
});

// 🧢 Функция-колбэк. Обявление, а не вызов
const renderCard = (data) => {
  // создаем переменную, заносим в нее результат работы функции, т.е. разметку
  const cardToAdd = createCard(data, "#card", handleCardClick);

  // вставляю в разметку то, что вернет метод - клонированный и заполненный фрагмент разметки
  cardSection.addItem(cardToAdd);
};

// Экземпляр класса UserInfo создается единожды
export const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

// 🧢 описываю функцию-колбэк сабмита профиля заранее
const handleSubmitProfile = ({ name, about }) => {
  // 3. Редактирование профиля - данные идут на сервер.
  api
    .editProfile(name, about)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сабмита: ${res.status}`);
    })
    .then((data) => {
      console.log("дата патча профиля: ", data);
      myUserInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

// попапу профиля передаю функцию сабмита профиля колбэком при создании инстанса попапа
const popupProfile = new PopupWithForm(
  ".popup_type_user-profile",
  (inputVaues) => {
    handleSubmitProfile(inputVaues);
  }
);
// вешаю слушатели попапу профиля
popupProfile.setEventListeners();

// 🧢 👨‍💼 колбэк кнопки редактирования профиля - откроет попап
const editProfile = () => {
  formValidators["profile-form"].resetValidation();
  // Наполняю поля формы данными со страницы через метод класса UserInf

  // деструктуризация. Переменные не покинут пределы слушателя
  const { name, about } = myUserInfo.getUserInfo();

  popupUser.nameInput.value = name;
  popupUser.aboutInput.value = about;

  popupProfile.open();
};

// 👨‍💼
editProfileBtn.addEventListener("click", () => editProfile());

// 🧢 колбэк слушателя сабмита карточки
const handleSubmitAddPlace = (formData) => {
  formValidators["add-place-form"].resetValidation();
  api
    .addCard({ name: formData.placeName, link: formData.placeUrl })
    .then((res) => {
      if (res) {
        return res.json();
      }
      return Promise.reject(`Ошибка в создании карточки: ${res.status}`);
    })
    .then((cardDataFromApi) => {
      console.log(cardDataFromApi);
      const card1by1 = new Card(cardDataFromApi, "#card", handleCardClick);
      cardSection.addItem(card1by1.getCard());
      addPlacePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
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

//
//
// ПОЛУЧАЮ ИЗНАЧАЛЬНЫЕ ФИО ПРОФИЛЯ И ВСТАВЛЯЮ В СТРАНИЦУ
api
  .setInitialUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    const userData = {};
    userData.name = result.name;
    userData.about = result.about;
    myUserInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

// ПОЛУЧАЮ ИЗНАЧАЛЬНЫЕ КАРТОЧКИ
const cardSection = new Section(renderCard, ".gallery");

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибочка получения карточек: ${res.status}`);
  })
  .then((cardsData) => {
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
