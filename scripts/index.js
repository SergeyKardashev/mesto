import { initialCards } from "./content.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// 🔴
// const popupAddPlaceMy = new PopupWithForm(".popup_type_new-place");
// popupAddPlaceMy.setEventListeners();

// const popupZoom = new PopupWithImage(".popup_type_zoom-image");

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

// Картинка попапа zoom (html-узел)
const popupImage = zoomPopup.querySelector(".popup__image-zoom");

// Подпись попапа zoom (html-узел)
const popupTxt = zoomPopup.querySelector(".popup__caption");

// Все кнопки закрытия попапов массивом из коллекции
const closePopupButtonsCollection = document.querySelectorAll(
  ".popup__close-button"
);

const myUserInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const renderInitialProfile = () => {
  myUserInfo.setUserInfo({
    name: "Жак-Ив Кусто",
    job: "Исследователь океана",
  });
};

const renderInitialCards = () => {
  const renderer = (data) => {
    const myCard = new Card(data, "#card", handleCardClick);

    // вставляю в разметку то, что вернет метод - клонированный и заполненный фрагмент разметки
    mySection.container.append(myCard.getCard());
  };

  const gallerySelector = ".gallery";
  const mySection = new Section(
    {
      items: initialCards,
      renderer: renderer,
    },
    gallerySelector
  );

  mySection.renderInitialCards();
};
// Вешаю 2 слушателия в начале
const addInitialListeners = () => {
  //
  // Слушатель кнопки редактирования профиля
  const addProfileBtnListener = () => {
    const addProfileBtn = document.querySelector(".profile__edit-btn");

    addProfileBtn.addEventListener("click", function () {
      formValidators["profile-form"].resetValidation();

      const handleSubmitUserProfile = ({ name, job }) => {
        myUserInfo.setUserInfo({ name, job });
        // фрагменты кода
        // const formUserInfo = new UserInfo({
        //   nameSelector: "#user-name",
        //   jobSelector: "#user-job",
        // });

        // 🔴 Дописать аргументы метода - он возвращает данные в форму
        // formUserInfo.getUserInfo();

        // 🔴 По сабмиту формы ее данные пишем в страницу
        // 🔴 Перенести отсюда в слушатель сабмита.
        // pageUserInfo.setUserInfo(formUserInfo.getUserInfo());
      };
      //
      const popupEditProfileForm = new PopupWithForm(
        ".popup_type_user-profile",
        handleSubmitUserProfile
      );
      //
      popupEditProfileForm.setEventListeners();
      popupEditProfileForm.open();
    });
  };
  //
  // Слушатель кнопки добавления карточки
  const addAddPlaceBtnListener = () => {
    const addPlaceButton = document.querySelector(".profile__add-place-btn");

    addPlaceButton.addEventListener("click", (evt) => {
      formValidators["add-place-form"].resetValidation();

      const handleSubmitAddPlace = (evt) => {
        evt.preventDefault();

        // таргет - тот кто заколил этот хэндлер (сабмит), т.е. форма.
        const placeNameInput = evt.target.querySelector(
          ".popup__input_type_place-name"
        );
        const pleceUrlInput = evt.target.querySelector(
          ".popup__input_type_place-url"
        );

        const cardDataCollected = {
          name: placeNameInput.value,
          link: pleceUrlInput.value,
        };

        const card1by1 = new Card(cardDataCollected, "#card", handleCardClick);
        mySection.addItem(card1by1.getCard());
      };

      // const addPlacePopup = new PopupWithForm(
      //   ".popup_type_new-place",
      //   handleSubmitAddPlace
      // );
      // addPlacePopup.setEventListeners();
      // addPlacePopup.open();
    });
  };
  //
  // Запуск навешивателей
  addProfileBtnListener();
  addAddPlaceBtnListener();
};

/*
Ниже самовызывающаяся функция чтобы вынести из глобального скоупа
кучу функций, переменных и вызовов.
Она запускает 3 описанных выше функции с группами комманд
*/
(() => {
  renderInitialCards();
  renderInitialProfile();
  addInitialListeners();
})();

// 🧢  функция открытия попапа ЗУМа - функция зумирования
function handleCardClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTxt.textContent = cardData.name;
  const cardPopup = new PopupWithImage(".popup_type_zoom-image");
  cardPopup.open();
}

// 🧢  🟢 Функция создания карточки
function getCard(cardData) {
  return new Card(cardData, "#card", handleCardClick);
}

// 🧢  🔴 Функция создания карточки
function createCard(cardData) {
  const cardItem = getCard(cardData);
  console.log(cardItem);
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

// ------ renderer (callback) as external function --------------

// const gallerySelector = ".gallery";
// const mySection = new Section(
//   {
//     items: initialCards,
//     renderer: renderer,
//   },
//   gallerySelector
// );

// mySection.renderInitialCards();
// console.log(mySection.initialData);
// const shitSection = new Section({ initialCards, renderer }, gallerySelector);

// 🟢 Слушатель кнопки открытыя попапа добавления места
